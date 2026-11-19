import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import type { z } from "zod";
import { GRAPHQL_URL } from "../config";
import { DonationConfigSchema, DonationErrorBodySchema } from "./types";

/**
 * HTTP-Client für die Donations-API von democracy-api (`/donations/v1`).
 *
 * Datenschutz (Constitution Prinzip I, FR-005/FR-006): Dieser Client nutzt bewusst NICHT Apollo und
 * sendet keine DEMOCRACY-Auth-Header (x-token, Device-Hash, Telefon). Spenden dürfen technisch nicht
 * mit Nutzerkonto oder Abstimmungen verknüpfbar sein.
 */

// Optional getrennt konfigurierbar (app.config.ts `extra.donationsApiUrl`, z. B. lokaler Testserver)
const configuredDonationsUrl: string | null = Constants.expoConfig?.extra?.donationsApiUrl || null;
export const DONATIONS_API_URL = (configuredDonationsUrl ?? `${GRAPHQL_URL}/donations/v1`).replace(/\/+$/, "");

const TIMEOUT_MS = 20_000;

export class DonationApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number | null,
  ) {
    super(message);
    this.name = "DonationApiError";
  }
}

const NETWORK_ERROR_MESSAGE =
  "Keine Verbindung zum Server. Bitte prüfe Deine Internetverbindung und versuche es erneut.";
const INVALID_RESPONSE_MESSAGE =
  "Unerwartete Antwort vom Server. Bitte versuche es später erneut.";

/**
 * Neuer Idempotency-Key für JEDEN Bezahlversuch (also jeden `confirmHandler`-Aufruf). Derselbe Key
 * wird nur verwendet, um denselben Request nach einem Netzwerkfehler zu wiederholen
 * (contracts/donations-api.md).
 */
export const newIdempotencyKey = (): string => Crypto.randomUUID();

interface RequestOptions<T> {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Spender-Schlüssel (base64url) für Verwaltungsendpunkte. */
  donorKey?: string;
  idempotencyKey?: string;
  schema: z.ZodType<T>;
}

const fetchWithTimeout = async (url: string, init: RequestInit) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

export async function donationRequest<T>(
  path: string,
  { method = "GET", body, donorKey, idempotencyKey, schema }: RequestOptions<T>,
): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
  if (donorKey) headers.Authorization = `DonorKey ${donorKey}`;

  const init: RequestInit = {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  };

  // Lesende und idempotente Requests werden nach einem Netzwerkfehler einmal wiederholt –
  // schreibende nur mit demselben Idempotency-Key, damit Stripe nie doppelt bucht.
  const canRetry = method === "GET" || method === "DELETE" || Boolean(idempotencyKey);
  let response: Response | undefined;
  for (let attempt = 0; attempt < (canRetry ? 2 : 1) && !response; attempt += 1) {
    try {
      response = await fetchWithTimeout(`${DONATIONS_API_URL}${path}`, init);
    } catch {
      response = undefined;
    }
  }
  if (!response) {
    throw new DonationApiError("network", NETWORK_ERROR_MESSAGE, null);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new DonationApiError("invalid_response", INVALID_RESPONSE_MESSAGE, response.status);
  }

  if (!response.ok) {
    const parsedError = DonationErrorBodySchema.safeParse(json);
    if (parsedError.success) {
      throw new DonationApiError(
        parsedError.data.error.code,
        parsedError.data.error.message,
        response.status,
      );
    }
    throw new DonationApiError("invalid_response", INVALID_RESPONSE_MESSAGE, response.status);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new DonationApiError("invalid_response", INVALID_RESPONSE_MESSAGE, response.status);
  }
  return parsed.data;
}

export const fetchDonationConfig = () =>
  donationRequest("/config", { schema: DonationConfigSchema });
