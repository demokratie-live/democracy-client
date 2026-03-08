"use strict";

const fs = require("fs");
const path = require("path");

const FLOW_FILE_PATTERN = /\.ya?ml$/i;

function resolveMaestroFlowPaths(flowPath) {
  const stats = fs.statSync(flowPath);

  if (!stats.isDirectory()) {
    return [flowPath];
  }

  const flowPaths = fs
    .readdirSync(flowPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && FLOW_FILE_PATTERN.test(entry.name))
    .map((entry) => path.join(flowPath, entry.name))
    .sort((left, right) => left.localeCompare(right));

  if (flowPaths.length === 0) {
    throw new Error(`No Maestro flow files found in ${flowPath}`);
  }

  return flowPaths;
}

if (require.main === module) {
  const flowPath = process.argv[2];

  if (!flowPath) {
    throw new Error("Expected a flow path argument");
  }

  for (const resolvedFlowPath of resolveMaestroFlowPaths(flowPath)) {
    console.log(resolvedFlowPath);
  }
}

module.exports = {
  resolveMaestroFlowPaths,
};
