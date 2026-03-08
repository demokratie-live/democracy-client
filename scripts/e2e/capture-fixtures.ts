#!/usr/bin/env npx tsx
/**
 * Capture fixture data from the real GraphQL API and save as JSON files.
 *
 * Usage:
 *   npx tsx scripts/e2e/capture-fixtures.ts
 *   npx tsx scripts/e2e/capture-fixtures.ts --api-url https://internal.api.democracy-app.de
 *
 * This fetches real API responses and writes them to src/fixtures/e2e/,
 * adding __typename fields needed for Apollo cache normalization.
 */

import * as fs from "fs";
import * as path from "path";

const DEFAULT_API_URL = "https://internal.api.democracy-app.de";
const FIXTURES_DIR = path.resolve(__dirname, "../../src/fixtures/e2e");

const apiUrl =
  process.argv.find((a) => a.startsWith("--api-url="))?.split("=")[1] ??
  DEFAULT_API_URL;

interface FixtureSpec {
  filename: string;
  query: string;
  variables?: Record<string, unknown>;
  addTypenames?: (data: Record<string, unknown>) => Record<string, unknown>;
}

const fixtures: FixtureSpec[] = [
  {
    filename: "CurrentConferenceWeek.json",
    query: `query CurrentConferenceWeek {
      currentConferenceWeek { calendarWeek start end }
    }`,
    addTypenames: (data) => ({
      currentConferenceWeek: {
        __typename: "ConferenceWeek",
        ...((data.currentConferenceWeek as Record<string, unknown>) ?? {}),
      },
    }),
  },
  {
    filename: "ProceduresList.json",
    query: `query ProceduresList($offset: Int, $pageSize: Int, $listTypes: [ListType!], $sort: String, $filter: ProcedureFilter, $period: Int!) {
      procedures(offset: $offset, pageSize: $pageSize, listTypes: $listTypes, sort: $sort, filter: $filter, period: $period) {
        _id title procedureId sessionTOPHeading subjectGroups voteDate voteEnd list type voteWeek voteYear
        activityIndex { activityIndex }
        votedGovernment voted
        voteResults { yes abstination no notVoted governmentDecision }
        communityVotes { yes abstination no total }
      }
    }`,
    variables: {
      offset: 0,
      pageSize: 10,
      listTypes: ["CONFERENCEWEEKS_PLANNED"],
      sort: "voteDate",
      period: 21,
    },
    addTypenames: (data) => ({
      procedures: ((data.procedures as Record<string, unknown>[]) ?? []).map(
        (p) => ({
          __typename: "Procedure",
          ...p,
          activityIndex: p.activityIndex
            ? { __typename: "ActivityIndex", ...(p.activityIndex as Record<string, unknown>) }
            : null,
          voteResults: p.voteResults
            ? { __typename: "VoteResult", ...(p.voteResults as Record<string, unknown>) }
            : null,
          communityVotes: p.communityVotes
            ? { __typename: "CommunityVotes", ...(p.communityVotes as Record<string, unknown>) }
            : null,
        }),
      ),
    }),
  },
  {
    filename: "Procedure.json",
    query: `query Procedure($id: ID!) {
      procedure(id: $id) {
        _id procedureId title sessionTOPHeading tags abstract voteDate voteEnd notify list type subjectGroups submissionDate currentStatus currentStatusHistory voted votedGovernment
        importantDocuments { editor type url number }
        communityVotes { yes abstination no total constituencies { yes abstination no constituency total } }
        voteResults { yes abstination no notVoted decisionText namedVote governmentDecision
          partyVotes { main party deviants { yes abstination no notVoted } }
        }
      }
    }`,
    variables: { id: "327971" },
    addTypenames: (data) => {
      const proc = data.procedure as Record<string, unknown> | null;
      if (!proc) return data;
      return {
        procedure: {
          __typename: "Procedure",
          ...proc,
          importantDocuments: ((proc.importantDocuments as Record<string, unknown>[]) ?? []).map(
            (d) => ({ __typename: "Document", ...d }),
          ),
          communityVotes: proc.communityVotes
            ? {
                __typename: "CommunityVotes",
                ...(proc.communityVotes as Record<string, unknown>),
                constituencies: ((
                  (proc.communityVotes as Record<string, unknown>)
                    .constituencies as Record<string, unknown>[]
                ) ?? []).map((c) => ({ __typename: "CommunityConstituencyVotes", ...c })),
              }
            : null,
          voteResults: proc.voteResults
            ? {
                __typename: "VoteResult",
                ...(proc.voteResults as Record<string, unknown>),
                partyVotes: ((
                  (proc.voteResults as Record<string, unknown>)
                    .partyVotes as Record<string, unknown>[]
                ) ?? []).map((pv) => ({
                  __typename: "PartyVote",
                  ...pv,
                  deviants: pv.deviants
                    ? { __typename: "Deviants", ...(pv.deviants as Record<string, unknown>) }
                    : null,
                })),
              }
            : null,
        },
      };
    },
  },
];

async function fetchAndSave(spec: FixtureSpec): Promise<void> {
  console.log(`Fetching ${spec.filename}...`);
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: spec.query, variables: spec.variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const json = (await response.json()) as { data: Record<string, unknown> };
  if (!json.data) {
    throw new Error(`No data returned for ${spec.filename}: ${JSON.stringify(json)}`);
  }

  const data = spec.addTypenames ? spec.addTypenames(json.data) : json.data;
  const filePath = path.join(FIXTURES_DIR, spec.filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`  ✓ Saved to ${filePath}`);
}

async function main(): Promise<void> {
  console.log(`Capturing fixtures from ${apiUrl}`);
  fs.mkdirSync(FIXTURES_DIR, { recursive: true });

  for (const spec of fixtures) {
    try {
      await fetchAndSave(spec);
    } catch (error) {
      console.error(`  ✗ Failed: ${spec.filename}:`, error);
    }
  }
  console.log("Done.");
}

main().catch(console.error);
