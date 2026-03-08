import { rewriteIncomingUrlToPath } from "../lib/urlParsing";

export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): string {
  return rewriteIncomingUrlToPath(path) ?? path;
}
