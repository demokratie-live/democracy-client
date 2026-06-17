const ALL_CATEGORIES = [
  "top100",
  "conferenceWeek",
  "conferenceWeekVote",
  "outcome",
];

const DEFAULT_PROCEDURE_TITLE = (procedureId) => `Testverfahren ${procedureId}`;

function parsePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseBoolean(value, fallback = false) {
  if (value == null || value === "") return fallback;

  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;

  const normalized = String(value).trim().toLowerCase();
  if (normalized === "") return fallback;

  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;

  return fallback;
}

function parsePushTestCliArgs(argv = process.argv.slice(2)) {
  const sendAll = argv.includes("--all");
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const firstArg = positional[0];
  const tokenOmitted = ALL_CATEGORIES.includes(firstArg);

  return {
    sendAll,
    deviceToken: tokenOmitted ? undefined : firstArg,
    category: tokenOmitted ? firstArg : positional[1] || "top100",
    procedureId: tokenOmitted ? positional[1] || "327971" : positional[2] || "327971",
    procedureTitle: tokenOmitted ? positional[2] : positional[3],
  };
}

function getPushTestOverrides({ env = process.env, procedureTitle } = {}) {
  return {
    procedureTitle: procedureTitle || env.PUSH_TEST_PROCEDURE_TITLE,
    top100Rank: env.PUSH_TEST_TOP100_RANK || "1",
    conferenceWeekCount: parsePositiveInteger(
      env.PUSH_TEST_CONFERENCE_WEEK_COUNT,
      1,
    ),
    outcomeVoted: parseBoolean(env.PUSH_TEST_OUTCOME_VOTED, false),
  };
}

function buildPayload(category, procedureId, overrides = {}) {
  const procedureTitle =
    overrides.procedureTitle?.trim() || DEFAULT_PROCEDURE_TITLE(procedureId);
  const top100Rank = String(overrides.top100Rank || "1");
  const conferenceWeekCount = parsePositiveInteger(
    String(overrides.conferenceWeekCount ?? "1"),
    1,
  );
  const outcomeVoted = parseBoolean(overrides.outcomeVoted, false);

  let title;
  let message;

  switch (category) {
    case "top100":
      title = `TOP 100 - #${top100Rank}: Jetzt Abstimmen!`;
      message = procedureTitle;
      break;
    case "conferenceWeek":
      title = "Kommende Woche ist Sitzungswoche!";
      message =
        conferenceWeekCount === 1
          ? "Es wartet 1 spannendes Thema auf Dich. Viel Spaß beim Abstimmen."
          : `Es warten ${conferenceWeekCount} spannende Themen auf Dich. Viel Spaß beim Abstimmen.`;
      break;
    case "conferenceWeekVote":
      title = "Diese Woche im Bundestag: Jetzt Abstimmen!";
      message = procedureTitle;
      break;
    case "outcome":
      title = outcomeVoted
        ? "Offizielles Ergebnis zu Deiner Abstimmung"
        : "Offizielles Ergebnis zur Abstimmung";
      message = procedureTitle;
      break;
    default:
      title = `Push Test: ${category}`;
      message = `Testing ${category} notification routing`;
      break;
  }

  const type = category === "conferenceWeek" ? "procedureBulk" : "procedure";

  return {
    aps: {
      alert: { title, body: message },
      sound: "push.aiff",
      "mutable-content": 1,
    },
    type,
    action: type,
    category,
    title,
    message,
    procedureId,
  };
}

module.exports = {
  ALL_CATEGORIES,
  buildPayload,
  getPushTestOverrides,
  parseBoolean,
  parsePushTestCliArgs,
};
