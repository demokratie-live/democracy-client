#!/usr/bin/env node
/* eslint-env node */
/**
 * Send real push notifications to an iOS device via APNs HTTP/2.
 *
 * Uses the EXACT same payload structure as the production cron job
 * (democracy-development/services/cron-jobs/push-send-queued).
 *
 * Usage:
 *   pnpm push:notification:device <device-token> [category] [procedureId] [procedureTitle]
 *   pnpm push:notification:device <device-token> --all
 *   pnpm push:notification:device [category] [procedureId]  # prompts for token interactively
 *
 * Categories: top100, conferenceWeek, conferenceWeekVote, outcome
 *
 * Examples:
 *   # Single category (default: top100)
 *   pnpm push:notification:device 0678f282...
 *
 *   # Specific category
 *   pnpm push:notification:device 0678f282... outcome 327971
 *
 *   # Optional procedure title override for title-based categories
 *   pnpm push:notification:device 0678f282... top100 327971 "Cannabis-Legalisierung"
 *
 *   # Token omitted — script auto-detects category as first arg and prompts for token
 *   pnpm push:notification:device outcome 327971
 *
 *   # All 4 categories at once (3s delay between each)
 *   pnpm push:notification:device 0678f282... --all
 *
 * Environment (all optional — sensible defaults provided):
 *   APNS_KEY_PATH  - Path to .p8 APNs auth key (default: auto-detect)
 *   APNS_KEY_ID    - Key ID from Apple Developer Portal (default: from filename)
 *   APNS_TEAM_ID   - Apple Developer Team ID (default: A4B84UJD7M)
 *   APNS_BUNDLE_ID - App bundle ID (default: de.democracy-deutschland.clientapp.internal)
 *   APNS_ENV       - "development" or "production" (default: development)
 *   PUSH_TEST_PROCEDURE_TITLE       - Fallback procedure title for message copy
 *   PUSH_TEST_TOP100_RANK           - TOP 100 rank used in the title (default: 1)
 *   PUSH_TEST_CONFERENCE_WEEK_COUNT - Queued procedure count for conferenceWeek copy
 *   PUSH_TEST_OUTCOME_VOTED         - true/false flag for the voted outcome variant
 */

import http2 from "node:http2";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import pushTestShared from "./push-test.shared.js";

const {
  ALL_CATEGORIES,
  buildPayload,
  getPushTestOverrides,
  parsePushTestCliArgs,
} = pushTestShared;

// --- Configuration ---
const TEAM_ID = process.env.APNS_TEAM_ID || "A4B84UJD7M";
const BUNDLE_ID =
  process.env.APNS_BUNDLE_ID ||
  "de.democracy-deutschland.clientapp.internal";
const APNS_ENV = process.env.APNS_ENV || "development";
const APNS_HOST =
  APNS_ENV === "production"
    ? "api.push.apple.com"
    : "api.development.push.apple.com";

// --- Parse CLI args ---
const { sendAll, deviceToken: parsedDeviceToken, category, procedureId, procedureTitle } =
  parsePushTestCliArgs();
let deviceToken = parsedDeviceToken;

// --- Interactive token prompt if not provided ---
async function promptToken() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stderr,
  });
  return new Promise((resolve) => {
    rl.question("📱 Enter device token: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// --- Find .p8 key ---
function findApnsKey() {
  const explicit = process.env.APNS_KEY_PATH;
  if (explicit && fs.existsSync(explicit)) return explicit;

  // Auto-detect: check common locations for any AuthKey .p8 key
  const home = process.env.HOME || "";
  const candidates = [
    path.join(home, "Downloads"),
    path.join(home, "Desktop"),
    path.join(home, ".appstoreconnect"),
    home,
    process.cwd(),
  ];

  for (const dir of candidates) {
    try {
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".p8"));
      if (files.length > 0) {
        const keyPath = path.join(dir, files[0]);
        return keyPath;
      }
    } catch {
      // skip inaccessible dirs
    }
  }

  console.error("❌ No .p8 key found.");
  console.error("   Set APNS_KEY_PATH to your APNs Authentication Key (.p8 file).");
  console.error("   Download one from: https://developer.apple.com/account/resources/authkeys/list");
  process.exit(1);
}

function extractKeyId(keyPath) {
  const explicit = process.env.APNS_KEY_ID;
  if (explicit) return explicit;

  const match = path.basename(keyPath).match(/AuthKey_(\w+)\.p8/);
  if (match) return match[1];

  console.error("❌ Cannot extract key ID from filename. Set APNS_KEY_ID.");
  process.exit(1);
}

// --- JWT Token for APNs ---
function createApnsJwt(keyPath, keyId) {
  const key = fs.readFileSync(keyPath, "utf8");
  const now = Math.floor(Date.now() / 1000);

  const header = Buffer.from(
    JSON.stringify({ alg: "ES256", kid: keyId })
  ).toString("base64url");

  const payload = Buffer.from(
    JSON.stringify({ iss: TEAM_ID, iat: now })
  ).toString("base64url");

  const signingInput = `${header}.${payload}`;
  const signer = crypto.createSign("SHA256");
  signer.update(signingInput);
  const derSignature = signer.sign(key);

  const rawSig = derToRaw(derSignature);
  const signature = rawSig.toString("base64url");

  return `${header}.${payload}.${signature}`;
}

function derToRaw(derSig) {
  let offset = 2;
  if (derSig[1] & 0x80) offset += derSig[1] & 0x7f;

  offset++;
  const rLen = derSig[offset++];
  const r = derSig.subarray(offset, offset + rLen);
  offset += rLen;

  offset++;
  const sLen = derSig[offset++];
  const s = derSig.subarray(offset, offset + sLen);

  return Buffer.concat([padTo32(r), padTo32(s)]);
}

function padTo32(buf) {
  if (buf.length === 33 && buf[0] === 0) return buf.subarray(1);
  if (buf.length === 32) return buf;
  if (buf.length < 32) {
    const padded = Buffer.alloc(32);
    buf.copy(padded, 32 - buf.length);
    return padded;
  }
  return buf.subarray(buf.length - 32);
}

// --- Send via APNs HTTP/2 ---
async function sendPush(token, payload, jwt) {
  return new Promise((resolve, reject) => {
    const client = http2.connect(`https://${APNS_HOST}`);
    client.on("error", (err) => reject(new Error(`Connection error: ${err.message}`)));

    const req = client.request({
      ":method": "POST",
      ":path": `/3/device/${token}`,
      authorization: `bearer ${jwt}`,
      "apns-topic": BUNDLE_ID,
      "apns-push-type": "alert",
      "apns-priority": "10",
      "apns-expiration": "0",
    });

    let responseData = "";
    let status;

    req.on("response", (hdrs) => { status = hdrs[":status"]; });
    req.on("data", (chunk) => { responseData += chunk; });
    req.on("end", () => { client.close(); resolve({ status, body: responseData }); });
    req.on("error", (err) => { client.close(); reject(err); });

    req.write(JSON.stringify(payload));
    req.end();
  });
}

function printResult(cat, result) {
  if (result.status === 200) {
    console.log(`  ✅ ${cat} — sent!`);
  } else {
    let reason = "";
    try { reason = JSON.parse(result.body).reason; } catch { /* ignore */ }
    console.error(`  ❌ ${cat} — failed (HTTP ${result.status}: ${reason})`);

    const hints = {
      BadDeviceToken: "Token invalid. Is the app running?",
      InvalidProviderToken: "Wrong .p8 key. Set APNS_KEY_PATH + APNS_KEY_ID.",
      TopicDisallowed: "Bundle ID mismatch. Set APNS_BUNDLE_ID.",
      Unregistered: "Token expired. Restart the app for a fresh token.",
      DeviceTokenNotForTopic: "Token from different bundle ID.",
    };
    if (hints[reason]) console.error(`     💡 ${hints[reason]}`);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- Main ---
async function main() {
  if (!deviceToken) {
    deviceToken = await promptToken();
    if (!deviceToken) {
      console.error(
        "Usage: pnpm push:notification:device <token> [category|--all] [procedureId] [procedureTitle]",
      );
      process.exit(1);
    }
  }

  // Validate device token format (APNs tokens are 64+ hex characters)
  if (!/^[a-fA-F0-9]{64,200}$/.test(deviceToken)) {
    console.error(`❌ Invalid device token format: "${deviceToken.substring(0, 20)}..."`);
    console.error("   Expected: hex string (64+ characters).");
    console.error("   Get the token from Metro logs after launching the app on device.");
    process.exit(1);
  }

  const keyPath = findApnsKey();
  const keyId = extractKeyId(keyPath);
  const jwt = createApnsJwt(keyPath, keyId);

  console.log("");
  console.log("🚀 DEMOCRACY Push Notification — Real Device");
  console.log("━".repeat(50));
  console.log(`  📱 Token:    ${deviceToken.substring(0, 16)}...`);
  console.log(`  🔑 Key:      ${path.basename(keyPath)} (${keyId})`);
  console.log(`  🌍 APNs:     ${APNS_ENV}`);
  console.log(`  📦 Bundle:   ${BUNDLE_ID}`);
  console.log("━".repeat(50));

  const categories = sendAll ? ALL_CATEGORIES : [category];
  const payloadOverrides = getPushTestOverrides({ procedureTitle });

  if (sendAll) {
    console.log(`\n📤 Sending all ${categories.length} categories (3s apart)...\n`);
  } else {
    console.log(`\n📤 Sending ${category} (procedureId: ${procedureId})...\n`);
  }

  for (const cat of categories) {
    const payload = buildPayload(cat, procedureId, payloadOverrides);
    try {
      const result = await sendPush(deviceToken, payload, jwt);
      printResult(cat, result);
    } catch (err) {
      console.error(`  ❌ ${cat} — ${err.message}`);
    }

    if (sendAll && cat !== categories[categories.length - 1]) {
      await sleep(3000);
    }
  }

  console.log("\n🏁 Done! Tap each notification to test deep link routing.");
  console.log("   Check Metro logs for [NotificationDeepLink] debug output.\n");
}

if (import.meta.url === new URL(process.argv[1], "file:").href) {
  main();
}
