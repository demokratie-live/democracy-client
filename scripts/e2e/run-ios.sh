#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

DEFAULT_E2E_BUILD_ROOT="${TMPDIR:-/tmp}"
APP_VARIANT="${APP_VARIANT:-internal}"
APP_ID="${APP_ID:-de.democracy-deutschland.clientapp.internal}"
IOS_SCHEME="${IOS_SCHEME:-DEMOCRACYInternal}"
IOS_WORKSPACE="${IOS_WORKSPACE:-ios/${IOS_SCHEME}.xcworkspace}"
IOS_PROJECT_DIR="${IOS_PROJECT_DIR:-ios}"
IOS_CONFIGURATION="${IOS_CONFIGURATION:-Release}"
IOS_DERIVED_DATA_PATH="${IOS_DERIVED_DATA_PATH:-${DEFAULT_E2E_BUILD_ROOT%/}/democracy-client-e2e-ios-build}"
IOS_APP_PATH="${IOS_APP_PATH:-${IOS_DERIVED_DATA_PATH}/Build/Products/${IOS_CONFIGURATION}-iphonesimulator/${IOS_SCHEME}.app}"
IOS_SIMULATOR_NAME="${IOS_SIMULATOR_NAME:-}"
IOS_DEVICE_UDID="${IOS_DEVICE_UDID:-}"
MAESTRO_DRIVER_STARTUP_TIMEOUT="${MAESTRO_DRIVER_STARTUP_TIMEOUT:-120000}"
WARM_LAUNCH_TIMEOUT="${WARM_LAUNCH_TIMEOUT:-20}"
WARM_LAUNCH_SETTLE_SECONDS="${WARM_LAUNCH_SETTLE_SECONDS:-2}"
CORE_SIMULATOR_SERVICE_LABEL="${CORE_SIMULATOR_SERVICE_LABEL:-com.apple.CoreSimulator.CoreSimulatorService}"
export APP_VARIANT APP_ID MAESTRO_DRIVER_STARTUP_TIMEOUT

MODE="test"
FLOW_PATH=".maestro/flows/"
SIMULATOR_HEALTHCHECK_OUTPUT=""

log() {
  printf '\n[%s] %s\n' "e2e:ios" "$*"
}

fail() {
  printf '\n[%s] ERROR: %s\n' "e2e:ios" "$*" >&2
  exit 1
}

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || fail "Required command not found: $1"
}

warn() {
  printf '\n[%s] WARN: %s\n' "e2e:ios" "$*" >&2
}

resolve_flow_paths() {
  node scripts/e2e/maestroFlowPaths.js "$1"
}

install_app() {
  local udid="$1"

  log "Installing $APP_ID on simulator $udid"
  xcrun simctl install "$udid" "$IOS_APP_PATH"
}

simulator_healthcheck() {
  local udid="$1"
  local output_file

  output_file="$(mktemp "${TMPDIR:-/tmp}/democracy-e2e-healthcheck.XXXXXX")"

  if xcrun simctl getenv "$udid" HOME >"$output_file" 2>&1; then
    if xcrun simctl bootstatus "$udid" -b >/dev/null 2>&1; then
      rm -f "$output_file"
      SIMULATOR_HEALTHCHECK_OUTPUT=""
      return 0
    fi
  fi

  SIMULATOR_HEALTHCHECK_OUTPUT="$(cat "$output_file")"
  rm -f "$output_file"

  if [[ -z "$SIMULATOR_HEALTHCHECK_OUTPUT" ]]; then
    SIMULATOR_HEALTHCHECK_OUTPUT="CoreSimulator health check failed for $udid"
  fi

  return 1
}

restart_core_simulator_service() {
  local launchctl_domain

  launchctl_domain="gui/$(id -u)/${CORE_SIMULATOR_SERVICE_LABEL}"

  if launchctl kickstart -k "$launchctl_domain" >/dev/null 2>&1; then
    log "Restarted CoreSimulator service ($CORE_SIMULATOR_SERVICE_LABEL)"
    return 0
  fi

  warn "Unable to restart CoreSimulator service via launchctl ($CORE_SIMULATOR_SERVICE_LABEL)"
  return 1
}

recover_simulator() {
  local udid="$1"
  local reason="$2"

  warn "Recovering simulator $udid after $reason"
  restart_core_simulator_service || true
  xcrun simctl shutdown "$udid" >/dev/null 2>&1 || true
  open -a Simulator >/dev/null 2>&1 || true
  xcrun simctl boot "$udid" >/dev/null 2>&1 || true
  xcrun simctl bootstatus "$udid" -b

  if [[ -d "$IOS_APP_PATH" ]]; then
    install_app "$udid"
    warm_launch_app "$udid"
  fi
}

ensure_flow_boundary_ready() {
  local udid="$1"
  local flow_label="$2"

  if simulator_healthcheck "$udid"; then
    return 0
  fi

  warn "CoreSimulator health check failed before $flow_label:"
  printf '%s\n' "$SIMULATOR_HEALTHCHECK_OUTPUT" >&2

  recover_simulator "$udid" "CoreSimulator health check failure before $flow_label"

  if simulator_healthcheck "$udid"; then
    return 0
  fi

  fail "CoreSimulator recovery failed before $flow_label: ${SIMULATOR_HEALTHCHECK_OUTPUT}"
}

maestro_startup_failure_detected() {
  local output_file="$1"

  grep -Eq 'IOSDriverTimeoutException|iOS driver not ready in time|Failed to connect to /127\.0\.0\.1:7001' "$output_file"
}

run_maestro_command() {
  local udid="$1"
  local resolved_flow_path="$2"
  local output_file="$3"
  local status=0

  set +e
  if ((${#EXTRA_MAESTRO_ARGS[@]})); then
    maestro --device "$udid" test "$resolved_flow_path" --config .maestro/config.yaml "${EXTRA_MAESTRO_ARGS[@]}" 2>&1 | tee "$output_file"
    status=${PIPESTATUS[0]}
  else
    maestro --device "$udid" test "$resolved_flow_path" --config .maestro/config.yaml 2>&1 | tee "$output_file"
    status=${PIPESTATUS[0]}
  fi
  set -e

  return "$status"
}

run_maestro_flow() {
  local udid="$1"
  local resolved_flow_path="$2"
  local attempt=1
  local output_file
  local status=0

  while ((attempt <= 2)); do
    ensure_flow_boundary_ready "$udid" "$resolved_flow_path"

    if ((attempt == 1)); then
      log "Running flow $resolved_flow_path"
    else
      log "Retrying flow $resolved_flow_path after simulator recovery"
    fi

    output_file="$(mktemp "${TMPDIR:-/tmp}/democracy-e2e-maestro.XXXXXX")"

    if run_maestro_command "$udid" "$resolved_flow_path" "$output_file"; then
      rm -f "$output_file"
      return 0
    fi

    status=$?

    if ((attempt == 1)) && maestro_startup_failure_detected "$output_file"; then
      warn "Detected iOS driver startup failure for $resolved_flow_path; recovering simulator and retrying once"
      rm -f "$output_file"
      recover_simulator "$udid" "Maestro driver startup failure in $resolved_flow_path"
      attempt=$((attempt + 1))
      continue
    fi

    rm -f "$output_file"
    return "$status"
  done
}

select_device_udid() {
  if [[ -n "$IOS_DEVICE_UDID" ]]; then
    printf '%s' "$IOS_DEVICE_UDID"
    return
  fi

  local selected_udid
  selected_udid="$(
    IOS_SIMULATOR_NAME="$IOS_SIMULATOR_NAME" python3 - <<'PY'
import json
import os
import subprocess
import sys

preferred_name = os.environ.get("IOS_SIMULATOR_NAME", "")
output = subprocess.check_output(
    ["xcrun", "simctl", "list", "-j", "devices", "available"],
    text=True,
)
devices_by_runtime = json.loads(output)["devices"]

devices = []
for runtime_devices in devices_by_runtime.values():
    for device in runtime_devices:
        if device.get("isAvailable") and device.get("name", "").startswith("iPhone"):
            devices.append(device)

if preferred_name:
    for device in devices:
        if device.get("name") == preferred_name:
            print(device["udid"])
            sys.exit(0)
    sys.exit(1)

for desired_state in ("Booted", "Shutdown"):
    for device in devices:
        if device.get("state") == desired_state:
            print(device["udid"])
            sys.exit(0)

sys.exit(1)
PY
  )" || true

  if [[ -n "$selected_udid" ]]; then
    printf '%s' "$selected_udid"
    return
  fi

  if [[ -n "$IOS_SIMULATOR_NAME" ]]; then
    fail "Simulator named '$IOS_SIMULATOR_NAME' was not found among available devices"
  fi

  fail "No available iPhone simulator found"
}

ensure_workspace() {
  if [[ -f "$IOS_WORKSPACE/contents.xcworkspacedata" ]]; then
    return
  fi

  log "iOS workspace not found – running Expo prebuild for iOS"
  APP_VARIANT="$APP_VARIANT" E2E_FIXTURES="${E2E_FIXTURES:-}" pnpm exec expo prebuild --platform ios

  [[ -f "$IOS_WORKSPACE/contents.xcworkspacedata" ]] || fail "iOS workspace still missing after prebuild: $IOS_WORKSPACE"
}

boot_device() {
  local udid="$1"
  log "Booting simulator $udid"
  open -a Simulator >/dev/null 2>&1 || true
  xcrun simctl boot "$udid" >/dev/null 2>&1 || true
  if xcrun simctl bootstatus "$udid" -b; then
    return 0
  fi

  warn "Initial simulator bootstatus failed for $udid; attempting recovery"
  recover_simulator "$udid" "initial bootstatus failure"
}

build_and_install_app() {
  local udid="$1"
  ensure_workspace

  log "Building $IOS_SCHEME ($IOS_CONFIGURATION) for simulator $udid"
  xcodebuild \
    -workspace "$IOS_WORKSPACE" \
    -scheme "$IOS_SCHEME" \
    -configuration "$IOS_CONFIGURATION" \
    -destination "platform=iOS Simulator,id=$udid" \
    -derivedDataPath "$IOS_DERIVED_DATA_PATH" \
    build

  [[ -d "$IOS_APP_PATH" ]] || fail "Built app not found at $IOS_APP_PATH"

  install_app "$udid"

  warm_launch_app "$udid"
}

warm_launch_app() {
  local udid="$1"
  local stdout_log
  local stderr_log
  local launch_status=0

  stdout_log="$(mktemp "${TMPDIR:-/tmp}/democracy-e2e-launch-stdout.XXXXXX")"
  stderr_log="$(mktemp "${TMPDIR:-/tmp}/democracy-e2e-launch-stderr.XXXXXX")"

  log "Warm-launching $APP_ID once before Maestro"
  if python3 - "$udid" "$APP_ID" "$stdout_log" "$stderr_log" "$WARM_LAUNCH_TIMEOUT" <<'PY'
import subprocess
import sys

udid, app_id, stdout_log, stderr_log, timeout_seconds = sys.argv[1:]
with open(stdout_log, "w") as stdout_handle, open(stderr_log, "w") as stderr_handle:
    try:
        subprocess.run(
            [
                "xcrun",
                "simctl",
                "launch",
                "--terminate-running-process",
                f"--stdout={stdout_log}",
                f"--stderr={stderr_log}",
                udid,
                app_id,
            ],
            check=True,
            timeout=int(timeout_seconds),
            stdout=stdout_handle,
            stderr=stderr_handle,
        )
    except subprocess.TimeoutExpired:
        sys.exit(124)
    except subprocess.CalledProcessError as exc:
        sys.exit(exc.returncode)
PY
  then
    launch_status=0
  else
    launch_status=$?
  fi

  if [[ "$launch_status" -ne 0 ]]; then
    if [[ "$launch_status" -eq 124 ]]; then
      warn "Warm launch timed out after ${WARM_LAUNCH_TIMEOUT}s; continuing to Maestro"
    else
      warn "Warm launch exited with code ${launch_status}; continuing to Maestro"
    fi

    if [[ -s "$stderr_log" ]]; then
      warn "Warm launch stderr:"
      tail -n 40 "$stderr_log" >&2
    fi
  else
    sleep "$WARM_LAUNCH_SETTLE_SECONDS"
  fi

  log "Stopping $APP_ID before Maestro"
  xcrun simctl terminate "$udid" "$APP_ID" >/dev/null 2>&1 || true
}

run_doctor() {
  require_cmd maestro
  require_cmd node
  require_cmd pnpm
  require_cmd xcrun
  require_cmd xcodebuild
  require_cmd python3

  local udid
  udid="$(select_device_udid)"

  log "Doctor summary"
  printf 'APP_VARIANT=%s\n' "$APP_VARIANT"
  printf 'APP_ID=%s\n' "$APP_ID"
  printf 'IOS_SCHEME=%s\n' "$IOS_SCHEME"
  printf 'IOS_WORKSPACE=%s\n' "$IOS_WORKSPACE"
  printf 'IOS_CONFIGURATION=%s\n' "$IOS_CONFIGURATION"
  printf 'IOS_DERIVED_DATA_PATH=%s\n' "$IOS_DERIVED_DATA_PATH"
  printf 'IOS_APP_PATH=%s\n' "$IOS_APP_PATH"
  printf 'MAESTRO_DRIVER_STARTUP_TIMEOUT=%s\n' "$MAESTRO_DRIVER_STARTUP_TIMEOUT"
  printf 'SELECTED_DEVICE_UDID=%s\n' "$udid"
  printf 'MAESTRO_VERSION=%s\n' "$(maestro --version)"

  if [[ -f "$IOS_WORKSPACE/contents.xcworkspacedata" ]]; then
    printf 'IOS_WORKSPACE_STATUS=present\n'
  else
    printf 'IOS_WORKSPACE_STATUS=missing (runner will prebuild)\n'
  fi
}

while (($#)); do
  case "$1" in
    --doctor)
      MODE="doctor"
      shift
      ;;
    --prepare-only)
      MODE="prepare"
      shift
      ;;
    --)
      shift
      break
      ;;
    *)
      FLOW_PATH="$1"
      shift
      break
      ;;
  esac
done

EXTRA_MAESTRO_ARGS=()
if (($#)); then
  EXTRA_MAESTRO_ARGS=("$@")
fi

require_cmd maestro
require_cmd node
require_cmd pnpm
require_cmd xcrun
require_cmd xcodebuild
require_cmd python3

if [[ "$MODE" == "doctor" ]]; then
  run_doctor
  exit 0
fi

[[ "$APP_VARIANT" == "internal" ]] || fail "E2E tests currently support APP_VARIANT=internal only"
[[ -e "$FLOW_PATH" ]] || fail "Flow path does not exist: $FLOW_PATH"

DEVICE_UDID="$(select_device_udid)"
boot_device "$DEVICE_UDID"
ensure_flow_boundary_ready "$DEVICE_UDID" "initial simulator boot"
build_and_install_app "$DEVICE_UDID"

if [[ "$MODE" == "prepare" ]]; then
  log "Prepare-only mode finished"
  exit 0
fi

FLOW_PATHS=()
while IFS= read -r RESOLVED_FLOW_PATH; do
  [[ -n "$RESOLVED_FLOW_PATH" ]] || continue
  FLOW_PATHS+=("$RESOLVED_FLOW_PATH")
done < <(resolve_flow_paths "$FLOW_PATH")

log "Running Maestro against ${#FLOW_PATHS[@]} flow(s) from $FLOW_PATH on $DEVICE_UDID"
for RESOLVED_FLOW_PATH in "${FLOW_PATHS[@]}"; do
  run_maestro_flow "$DEVICE_UDID" "$RESOLVED_FLOW_PATH"
done
