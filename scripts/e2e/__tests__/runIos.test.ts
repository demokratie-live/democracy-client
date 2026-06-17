/// <reference types="jest" />
import childProcess from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

const REPO_ROOT = path.resolve(__dirname, "../../..");
const RUNNER_PATH = path.join(REPO_ROOT, "scripts/e2e/run-ios.sh");

const writeExecutable = (filePath: string, contents: string) => {
  fs.writeFileSync(filePath, contents);
  fs.chmodSync(filePath, 0o755);
};

describe("run-ios.sh", () => {
  const createFakeRunnerEnvironment = (
    tempRoot: string,
    options?: {
      maestroScript?: string;
      xcrunScript?: string;
      launchctlScript?: string;
      openScript?: string;
    },
  ) => {
    const fakeBin = path.join(tempRoot, "fakebin");
    const flowsDir = path.join(tempRoot, "flows");
    const workspaceDir = path.join(tempRoot, "ios", "DEMOCRACYInternal.xcworkspace");
    const maestroLogPath = path.join(tempRoot, "maestro-invocations.log");
    const xcrunLogPath = path.join(tempRoot, "xcrun-invocations.log");
    const launchctlLogPath = path.join(tempRoot, "launchctl-invocations.log");
    const buildDir = path.join(tempRoot, "build");

    fs.mkdirSync(fakeBin, { recursive: true });
    fs.mkdirSync(flowsDir, { recursive: true });
    fs.mkdirSync(workspaceDir, { recursive: true });

    fs.writeFileSync(path.join(workspaceDir, "contents.xcworkspacedata"), "");

    writeExecutable(
      path.join(fakeBin, "maestro"),
      options?.maestroScript ??
        `#!/bin/sh
printf '%s\\n' "$*" >> "${maestroLogPath}"
exit 0
`,
    );

    writeExecutable(
      path.join(fakeBin, "open"),
      options?.openScript ??
        `#!/bin/sh
exit 0
`,
    );

    writeExecutable(
      path.join(fakeBin, "launchctl"),
      options?.launchctlScript ??
        `#!/bin/sh
printf '%s\\n' "$*" >> "${launchctlLogPath}"
exit 0
`,
    );

    writeExecutable(
      path.join(fakeBin, "xcodebuild"),
      `#!/bin/sh
DERIVED_DATA_PATH=
SCHEME=
CONFIGURATION=
while [ "$#" -gt 0 ]; do
  case "$1" in
    -derivedDataPath) DERIVED_DATA_PATH="$2"; shift 2 ;;
    -scheme) SCHEME="$2"; shift 2 ;;
    -configuration) CONFIGURATION="$2"; shift 2 ;;
    *) shift ;;
  esac
done
mkdir -p "$DERIVED_DATA_PATH/Build/Products/\${CONFIGURATION}-iphonesimulator/\${SCHEME}.app"
exit 0
`,
    );

    writeExecutable(
      path.join(fakeBin, "xcrun"),
      options?.xcrunScript ??
        `#!/bin/sh
printf '%s\\n' "$*" >> "${xcrunLogPath}"
if [ "$1" = "simctl" ] && [ "$2" = "list" ] && [ "$3" = "-j" ]; then
  cat <<'JSON'
{"devices":{"com.apple.CoreSimulator.SimRuntime.iOS-18-0":[{"state":"Booted","isAvailable":true,"name":"iPhone 17 Pro","udid":"TEST-UDID"}]}}
JSON
  exit 0
fi
if [ "$1" = "simctl" ] && [ "$2" = "getenv" ]; then
  echo "/tmp/fake-home"
  exit 0
fi
exit 0
`,
    );

    return {
      fakeBin,
      flowsDir,
      workspaceDir,
      maestroLogPath,
      xcrunLogPath,
      launchctlLogPath,
      buildDir,
    };
  };

  it("runs Maestro once per flow file when given a directory", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "democracy-run-ios-"));
    const { fakeBin, flowsDir, workspaceDir, maestroLogPath, buildDir } =
      createFakeRunnerEnvironment(tempRoot);
    fs.writeFileSync(path.join(flowsDir, "z-last.yaml"), "");
    fs.writeFileSync(path.join(flowsDir, "a-first.yaml"), "");

    const result = childProcess.execFileSync("bash", [RUNNER_PATH, flowsDir], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${fakeBin}:${process.env.PATH}`,
        IOS_DEVICE_UDID: "TEST-UDID",
        IOS_WORKSPACE: workspaceDir,
        IOS_DERIVED_DATA_PATH: buildDir,
      },
    });

    expect(result).toContain("Running Maestro against 2 flow(s)");
    expect(result).toContain(`Running flow ${path.join(flowsDir, "a-first.yaml")}`);
    expect(result).toContain(`Running flow ${path.join(flowsDir, "z-last.yaml")}`);

    const maestroInvocations = fs.readFileSync(maestroLogPath, "utf8").trim().split("\n");
    expect(maestroInvocations).toEqual([
      `--device TEST-UDID test ${path.join(flowsDir, "a-first.yaml")} --config .maestro/config.yaml`,
      `--device TEST-UDID test ${path.join(flowsDir, "z-last.yaml")} --config .maestro/config.yaml`,
    ]);
  });

  it("recovers CoreSimulator health before the next flow starts", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "democracy-run-ios-health-"));
    const healthcheckCountPath = path.join(tempRoot, "healthcheck-count");
    const recoveredPath = path.join(tempRoot, "recovered");
    const {
      fakeBin,
      flowsDir,
      workspaceDir,
      maestroLogPath,
      xcrunLogPath,
      launchctlLogPath,
      buildDir,
    } = createFakeRunnerEnvironment(tempRoot, {
      xcrunScript: `#!/bin/sh
printf '%s\\n' "$*" >> "${path.join(tempRoot, "xcrun-invocations.log")}"
if [ "$1" = "simctl" ] && [ "$2" = "list" ] && [ "$3" = "-j" ]; then
  cat <<'JSON'
{"devices":{"com.apple.CoreSimulator.SimRuntime.iOS-18-0":[{"state":"Booted","isAvailable":true,"name":"iPhone 17 Pro","udid":"TEST-UDID"}]}}
JSON
  exit 0
fi
if [ "$1" = "simctl" ] && [ "$2" = "getenv" ]; then
  COUNT=0
  if [ -f "${healthcheckCountPath}" ]; then
    COUNT=$(cat "${healthcheckCountPath}")
  fi
  COUNT=$((COUNT + 1))
  printf '%s' "$COUNT" > "${healthcheckCountPath}"
  if [ "$COUNT" -eq 3 ] && [ ! -f "${recoveredPath}" ]; then
    echo "Invalid device state: Mach error -308 (ipc/mig) server died" >&2
    exit 1
  fi
  echo "/tmp/fake-home"
  exit 0
fi
if [ "$1" = "simctl" ] && [ "$2" = "shutdown" ]; then
  touch "${recoveredPath}"
  exit 0
fi
exit 0
`,
    });

    fs.writeFileSync(path.join(flowsDir, "a-first.yaml"), "");
    fs.writeFileSync(path.join(flowsDir, "b-second.yaml"), "");

    const result = childProcess.spawnSync("bash", [RUNNER_PATH, flowsDir], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${fakeBin}:${process.env.PATH}`,
        IOS_DEVICE_UDID: "TEST-UDID",
        IOS_WORKSPACE: workspaceDir,
        IOS_DERIVED_DATA_PATH: buildDir,
      },
    });

    expect(result.status).toBe(0);

    const combinedOutput = `${result.stdout}${result.stderr}`;
    expect(combinedOutput).toContain("CoreSimulator health check failed before");
    expect(combinedOutput).toContain("Recovering simulator TEST-UDID");

    const maestroInvocations = fs.readFileSync(maestroLogPath, "utf8").trim().split("\n");
    expect(maestroInvocations).toEqual([
      `--device TEST-UDID test ${path.join(flowsDir, "a-first.yaml")} --config .maestro/config.yaml`,
      `--device TEST-UDID test ${path.join(flowsDir, "b-second.yaml")} --config .maestro/config.yaml`,
    ]);

    const xcrunInvocations = fs.readFileSync(xcrunLogPath, "utf8");
    expect(xcrunInvocations).toContain("simctl getenv TEST-UDID HOME");
    expect(xcrunInvocations).toContain("simctl shutdown TEST-UDID");
    expect(xcrunInvocations).toContain("simctl boot TEST-UDID");

    const launchctlInvocations = fs.readFileSync(launchctlLogPath, "utf8");
    expect(launchctlInvocations).toContain(
      "kickstart -k gui/",
    );
    expect(launchctlInvocations).toContain(
      "com.apple.CoreSimulator.CoreSimulatorService",
    );
  });

  it("retries a flow once after an iOS driver startup failure", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "democracy-run-ios-retry-"));
    const maestroAttemptPath = path.join(tempRoot, "maestro-attempt");
    const { fakeBin, flowsDir, workspaceDir, maestroLogPath, xcrunLogPath, buildDir } =
      createFakeRunnerEnvironment(tempRoot, {
        maestroScript: `#!/bin/sh
COUNT=0
if [ -f "${maestroAttemptPath}" ]; then
  COUNT=$(cat "${maestroAttemptPath}")
fi
COUNT=$((COUNT + 1))
printf '%s' "$COUNT" > "${maestroAttemptPath}"
printf '%s\\n' "$*" >> "${path.join(tempRoot, "maestro-invocations.log")}"
if [ "$COUNT" -eq 1 ]; then
  echo "iOS driver not ready in time, consider increasing timeout by configuring MAESTRO_DRIVER_STARTUP_TIMEOUT env variable" >&2
  echo "xcuitest.installer.LocalXCTestInstaller\\$IOSDriverTimeoutException: iOS driver not ready in time" >&2
  exit 1
fi
exit 0
`,
      });

    fs.writeFileSync(path.join(flowsDir, "rating.yaml"), "");

    const result = childProcess.spawnSync(
      "bash",
      [RUNNER_PATH, path.join(flowsDir, "rating.yaml")],
      {
        cwd: REPO_ROOT,
        encoding: "utf8",
        env: {
          ...process.env,
          PATH: `${fakeBin}:${process.env.PATH}`,
          IOS_DEVICE_UDID: "TEST-UDID",
          IOS_WORKSPACE: workspaceDir,
          IOS_DERIVED_DATA_PATH: buildDir,
        },
      },
    );

    expect(result.status).toBe(0);
    expect(`${result.stdout}${result.stderr}`).toContain(
      "Detected iOS driver startup failure",
    );

    const maestroInvocations = fs.readFileSync(maestroLogPath, "utf8").trim().split("\n");
    expect(maestroInvocations).toEqual([
      `--device TEST-UDID test ${path.join(flowsDir, "rating.yaml")} --config .maestro/config.yaml`,
      `--device TEST-UDID test ${path.join(flowsDir, "rating.yaml")} --config .maestro/config.yaml`,
    ]);

    const xcrunInvocations = fs.readFileSync(xcrunLogPath, "utf8");
    expect(xcrunInvocations).toContain("simctl shutdown TEST-UDID");
    expect(xcrunInvocations).toContain("simctl boot TEST-UDID");
  });
});
