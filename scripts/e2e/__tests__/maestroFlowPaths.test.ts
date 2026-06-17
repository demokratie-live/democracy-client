/// <reference types="jest" />
import fs from "fs";
import os from "os";
import path from "path";

const { resolveMaestroFlowPaths } = require("../maestroFlowPaths");

describe("resolveMaestroFlowPaths", () => {
  it("returns a single file path unchanged", () => {
    expect(resolveMaestroFlowPaths(".maestro/flows/verification.yaml")).toEqual([
      ".maestro/flows/verification.yaml",
    ]);
  });

  it("expands flow directories into a stable yaml-only sequence", () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "democracy-maestro-flows-"),
    );

    fs.writeFileSync(path.join(tempDir, "verification.yaml"), "");
    fs.writeFileSync(path.join(tempDir, "smoke.yml"), "");
    fs.writeFileSync(path.join(tempDir, "README.md"), "");
    fs.mkdirSync(path.join(tempDir, "nested"));

    expect(resolveMaestroFlowPaths(tempDir)).toEqual([
      path.join(tempDir, "smoke.yml"),
      path.join(tempDir, "verification.yaml"),
    ]);
  });

  it("rejects directories without flow files", () => {
    const tempDir = fs.mkdtempSync(
      path.join(os.tmpdir(), "democracy-empty-flows-"),
    );

    expect(() => resolveMaestroFlowPaths(tempDir)).toThrow(
      "No Maestro flow files found",
    );
  });
});
