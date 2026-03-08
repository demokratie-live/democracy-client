import { NotificationRoute } from "../types/pushNotification";

/**
 * Web URL patterns from democracy-app.de:
 *
 * Single procedure: https://democracy-app.de/{type}/{procedureId}/{slug}
 *   type = gesetzentwurf | antrag | ... (procedure type, lowercase)
 *   procedureId = e.g. "21-12345"
 *   slug = URL-safe title (optional, for SEO)
 *
 * Examples:
 *   https://democracy-app.de/gesetzentwurf/21-12345/some-title
 *   https://internal.democracy-app.de/antrag/20-9999/another-title
 */

const PROCEDURE_TYPE_PATTERN =
  /^(gesetzentwurf|antrag|entschließungsantrag|selbständiger\s*antrag)$/i;

const PROCEDURE_ID_PATTERN = /^\d{1,2}-\d+$/;

const KNOWN_DOMAINS = [
  "democracy-app.de",
  "internal.democracy-app.de",
  "alpha.democracy-app.de",
  "beta.democracy-app.de",
];

const CUSTOM_SCHEME = "democracy:";

function hasKnownDomain(hostname: string): boolean {
  return KNOWN_DOMAINS.some((domain) => hostname.endsWith(domain));
}

function getAppUrlSegments(parsed: URL): string[] {
  return [parsed.hostname, ...parsed.pathname.split("/").filter(Boolean)].filter(
    Boolean,
  );
}

function withSearch(pathname: string, search: string): string {
  return search ? `${pathname}${search}` : pathname;
}

/**
 * Parses a web URL from democracy-app.de and extracts navigation info.
 *
 * @param url - Full URL string (e.g., https://democracy-app.de/gesetzentwurf/21-12345/title)
 * @param legislaturePeriod - Current legislature period for list routes
 * @returns NotificationRoute for navigation, or null if URL doesn't match
 */
export function parseWebUrl(
  url: string,
  _legislaturePeriod: string,
): NotificationRoute {
  try {
    const parsed = new URL(url);

    // Check if it's a known domain
    if (!hasKnownDomain(parsed.hostname)) {
      return null;
    }

    // Split path: ["", "{type}", "{procedureId}", "{slug}"]
    const pathParts = parsed.pathname.split("/").filter(Boolean);

    if (pathParts.length < 2) {
      return null;
    }

    const [type, procedureId] = pathParts;

    // Validate type is a known procedure type
    if (!PROCEDURE_TYPE_PATTERN.test(type)) {
      return null;
    }

    // Validate procedureId format
    if (!PROCEDURE_ID_PATTERN.test(procedureId)) {
      return null;
    }

    // Web URLs always go directly to procedure detail (no list context)
    return {
      kind: "detail",
      detailRoute: `/procedure/${procedureId}`,
    };
  } catch {
    return null;
  }
}

/**
 * Checks if a URL is from a democracy-app.de domain.
 */
export function isDemocracyWebUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return hasKnownDomain(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Extracts procedureId from a web URL path.
 * Returns null if the URL doesn't match the expected pattern.
 */
export function extractProcedureIdFromWebUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split("/").filter(Boolean);

    if (pathParts.length < 2) return null;

    const [type, procedureId] = pathParts;

    if (!PROCEDURE_TYPE_PATTERN.test(type)) return null;
    if (!PROCEDURE_ID_PATTERN.test(procedureId)) return null;

    return procedureId;
  } catch {
    return null;
  }
}

/**
 * Rewrites native incoming URLs into Expo Router paths.
 *
 * Examples:
 * - democracy:///procedure/21-12345        -> /procedure/21-12345
 * - democracy://notification?...           -> /notification?...
 * - https://democracy-app.de/.../21-12345  -> /procedure/21-12345
 */
export function rewriteIncomingUrlToPath(url: string): string | null {
  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (hasKnownDomain(parsed.hostname)) {
      const procedureId = extractProcedureIdFromWebUrl(url);
      if (!procedureId) {
        return "/";
      }

      return withSearch(`/procedure/${procedureId}`, parsed.search);
    }

    if (parsed.protocol !== CUSTOM_SCHEME) {
      return null;
    }

    const segments = getAppUrlSegments(parsed);

    if (segments.length === 0) {
      return "/";
    }

    if (segments[0] === "procedure") {
      if (!segments[1]) {
        return "/";
      }

      return withSearch(`/procedure/${segments[1]}`, parsed.search);
    }

    if (segments[0] === "notification") {
      return withSearch("/notification", parsed.search);
    }

    return withSearch(`/${segments.join("/")}`, parsed.search);
  } catch {
    return null;
  }
}
