/// <reference types="jest" />
import {
  parseWebUrl,
  isDemocracyWebUrl,
  extractProcedureIdFromWebUrl,
  rewriteIncomingUrlToPath,
} from "../urlParsing";

const LP = "21";

describe("parseWebUrl", () => {
  describe("valid procedure URLs", () => {
    it("parses gesetzentwurf URL", () => {
      const result = parseWebUrl(
        "https://democracy-app.de/gesetzentwurf/21-12345/some-title",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("parses antrag URL", () => {
      const result = parseWebUrl(
        "https://democracy-app.de/antrag/20-9999/another-title",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/20-9999",
      });
    });

    it("parses URL without slug", () => {
      const result = parseWebUrl(
        "https://democracy-app.de/gesetzentwurf/21-12345",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("parses internal subdomain URL", () => {
      const result = parseWebUrl(
        "https://internal.democracy-app.de/gesetzentwurf/21-12345/title",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("parses alpha subdomain URL", () => {
      const result = parseWebUrl(
        "https://alpha.democracy-app.de/gesetzentwurf/21-12345/title",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });

    it("parses beta subdomain URL", () => {
      const result = parseWebUrl(
        "https://beta.democracy-app.de/gesetzentwurf/21-12345/title",
        LP,
      );
      expect(result).toEqual({
        kind: "detail",
        detailRoute: "/procedure/21-12345",
      });
    });
  });

  describe("invalid URLs", () => {
    it("returns null for unknown domain", () => {
      const result = parseWebUrl(
        "https://example.com/gesetzentwurf/21-12345/title",
        LP,
      );
      expect(result).toBeNull();
    });

    it("returns null for unknown type", () => {
      const result = parseWebUrl(
        "https://democracy-app.de/unknown/21-12345/title",
        LP,
      );
      expect(result).toBeNull();
    });

    it("returns null for invalid procedureId format", () => {
      const result = parseWebUrl(
        "https://democracy-app.de/gesetzentwurf/invalid/title",
        LP,
      );
      expect(result).toBeNull();
    });

    it("returns null for root URL", () => {
      const result = parseWebUrl("https://democracy-app.de/", LP);
      expect(result).toBeNull();
    });

    it("returns null for invalid URL string", () => {
      const result = parseWebUrl("not-a-url", LP);
      expect(result).toBeNull();
    });
  });
});

describe("isDemocracyWebUrl", () => {
  it("returns true for main domain", () => {
    expect(isDemocracyWebUrl("https://democracy-app.de/something")).toBe(true);
  });

  it("returns true for subdomain", () => {
    expect(
      isDemocracyWebUrl("https://internal.democracy-app.de/something"),
    ).toBe(true);
  });

  it("returns false for custom scheme", () => {
    expect(isDemocracyWebUrl("democracy://procedure/21-12345")).toBe(false);
  });

  it("returns false for other domains", () => {
    expect(isDemocracyWebUrl("https://example.com/something")).toBe(false);
  });

  it("returns false for invalid URL", () => {
    expect(isDemocracyWebUrl("not-a-url")).toBe(false);
  });
});

describe("extractProcedureIdFromWebUrl", () => {
  it("extracts procedureId from valid URL", () => {
    expect(
      extractProcedureIdFromWebUrl(
        "https://democracy-app.de/gesetzentwurf/21-12345/title",
      ),
    ).toBe("21-12345");
  });

  it("returns null for invalid URL", () => {
    expect(
      extractProcedureIdFromWebUrl("https://democracy-app.de/unknown/invalid"),
    ).toBeNull();
  });
});

describe("rewriteIncomingUrlToPath", () => {
  it("rewrites website procedure links to procedure routes", () => {
    expect(
      rewriteIncomingUrlToPath(
        "https://democracy-app.de/gesetzentwurf/21-12345/some-title",
      ),
    ).toBe("/procedure/21-12345");
  });

  it("rewrites custom scheme procedure links with triple slash", () => {
    expect(
      rewriteIncomingUrlToPath("democracy:///procedure/21-12345?e2e=deeplink"),
    ).toBe("/procedure/21-12345?e2e=deeplink");
  });

  it("rewrites custom scheme procedure links with double slash", () => {
    expect(rewriteIncomingUrlToPath("democracy://procedure/21-12345")).toBe(
      "/procedure/21-12345",
    );
  });

  it("rewrites notification links to the notification route", () => {
    expect(
      rewriteIncomingUrlToPath(
        "democracy:///notification?category=top100&procedureId=21-12345",
      ),
    ).toBe("/notification?category=top100&procedureId=21-12345");
  });

  it("returns root for empty custom-scheme URLs", () => {
    expect(rewriteIncomingUrlToPath("democracy://")).toBe("/");
  });

  it("passes through already-normalized app paths", () => {
    expect(rewriteIncomingUrlToPath("/procedure/21-12345")).toBe(
      "/procedure/21-12345",
    );
  });

  it("returns null for unrelated URLs", () => {
    expect(rewriteIncomingUrlToPath("mailto:team@democracy-app.de")).toBeNull();
  });
});
