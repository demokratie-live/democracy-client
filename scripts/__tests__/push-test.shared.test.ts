import {
  buildPayload,
  getPushTestOverrides,
  parsePushTestCliArgs,
} from "../push-test.shared";

describe("buildPayload", () => {
  it("builds the production-faithful TOP 100 copy", () => {
    expect(
      buildPayload("top100", "327971", {
        procedureTitle: "Cannabis-Legalisierung",
        top100Rank: "7",
      }),
    ).toEqual({
      aps: {
        alert: {
          title: "TOP 100 - #7: Jetzt Abstimmen!",
          body: "Cannabis-Legalisierung",
        },
        sound: "push.aiff",
        "mutable-content": 1,
      },
      type: "procedure",
      action: "procedure",
      category: "top100",
      title: "TOP 100 - #7: Jetzt Abstimmen!",
      message: "Cannabis-Legalisierung",
      procedureId: "327971",
    });
  });

  it.each([
    [1, "Es wartet 1 spannendes Thema auf Dich. Viel Spaß beim Abstimmen."],
    [3, "Es warten 3 spannende Themen auf Dich. Viel Spaß beim Abstimmen."],
  ])(
    "builds the conference week copy for %s queued procedures",
    (conferenceWeekCount, expectedMessage) => {
      const payload = buildPayload("conferenceWeek", "327971", {
        conferenceWeekCount,
      });

      expect(payload.title).toBe("Kommende Woche ist Sitzungswoche!");
      expect(payload.message).toBe(expectedMessage);
      expect(payload.type).toBe("procedureBulk");
      expect(payload.action).toBe("procedureBulk");
    },
  );

  it("builds the production-faithful conference week vote copy", () => {
    const payload = buildPayload("conferenceWeekVote", "327971", {
      procedureTitle: "Haushaltsgesetz 2025",
    });

    expect(payload.title).toBe("Diese Woche im Bundestag: Jetzt Abstimmen!");
    expect(payload.message).toBe("Haushaltsgesetz 2025");
  });

  it.each([
    [false, "Offizielles Ergebnis zur Abstimmung"],
    [true, "Offizielles Ergebnis zu Deiner Abstimmung"],
    ["false", "Offizielles Ergebnis zur Abstimmung"],
    ["0", "Offizielles Ergebnis zur Abstimmung"],
    ["no", "Offizielles Ergebnis zur Abstimmung"],
    ["true", "Offizielles Ergebnis zu Deiner Abstimmung"],
  ])("builds the outcome copy for voted=%s", (outcomeVoted, expectedTitle) => {
    const payload = buildPayload("outcome", "327971", {
      procedureTitle: "Gesetz zur Wahlrechtsreform",
      outcomeVoted,
    });

    expect(payload.title).toBe(expectedTitle);
    expect(payload.message).toBe("Gesetz zur Wahlrechtsreform");
  });
});

describe("getPushTestOverrides", () => {
  it("reads the optional CLI/env overrides with safe defaults", () => {
    expect(
      getPushTestOverrides({
        env: {
          PUSH_TEST_PROCEDURE_TITLE: "Env Titel",
          PUSH_TEST_TOP100_RANK: "11",
          PUSH_TEST_CONFERENCE_WEEK_COUNT: "4",
          PUSH_TEST_OUTCOME_VOTED: "true",
        },
        procedureTitle: "CLI Titel",
      }),
    ).toEqual({
      procedureTitle: "CLI Titel",
      top100Rank: "11",
      conferenceWeekCount: 4,
      outcomeVoted: true,
    });
  });

  it("falls back to defaults when optional overrides are missing or invalid", () => {
    expect(
      getPushTestOverrides({
        env: {
          PUSH_TEST_CONFERENCE_WEEK_COUNT: "0",
          PUSH_TEST_OUTCOME_VOTED: "",
        },
      }),
    ).toEqual({
      procedureTitle: undefined,
      top100Rank: "1",
      conferenceWeekCount: 1,
      outcomeVoted: false,
    });
  });
});

describe("parsePushTestCliArgs", () => {
  it("keeps the documented token-first CLI form", () => {
    expect(
      parsePushTestCliArgs([
        "0678f282token",
        "outcome",
        "327971",
        "Cannabis-Legalisierung",
      ]),
    ).toEqual({
      sendAll: false,
      deviceToken: "0678f282token",
      category: "outcome",
      procedureId: "327971",
      procedureTitle: "Cannabis-Legalisierung",
    });
  });

  it("treats a leading known category as an omitted token", () => {
    expect(parsePushTestCliArgs(["outcome", "327971"])).toEqual({
      sendAll: false,
      deviceToken: undefined,
      category: "outcome",
      procedureId: "327971",
      procedureTitle: undefined,
    });
  });

  it("preserves --all while still prompting when the token is omitted", () => {
    expect(parsePushTestCliArgs(["--all"])).toEqual({
      sendAll: true,
      deviceToken: undefined,
      category: "top100",
      procedureId: "327971",
      procedureTitle: undefined,
    });
  });
});
