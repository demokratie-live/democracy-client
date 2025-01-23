import { uniqBy } from "lodash";
import {
  CommunityVotes,
  DeputiesResult,
  DeputyProcedure,
  PartyVote,
  Procedure,
  TypedTypePolicies,
  VoteResult,
} from "../../__generated__/graphql";

export const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      procedures: {
        keyArgs: ["listTypes", "sort", "filter", "period"],
        merge(existing: Procedure[] = [], incoming: Procedure[]) {
          return uniqBy(
            [...existing, ...incoming],
            (procedure) =>
              procedure.procedureId ??
              (procedure as unknown as { __ref: string }).__ref
          );
        },
      },
      deputies: {
        keyArgs: [
          "filterTerm",
          "excludeIds",
          "filterIds",
          "filterConstituency",
          "period",
        ],
        merge(
          existing: DeputiesResult = { data: [], hasMore: true, total: 0 },
          incoming: DeputiesResult
        ) {
          return {
            ...incoming,
            data: uniqBy([...existing.data, ...incoming.data], (deputy) => {
              return (deputy as unknown as { __ref: string }).__ref;
            }),
          };
        },
      },
      deputy: {
        keyArgs: ["id", "votedProcedureIds"],
      },
    },
  },
  Procedure: {
    keyFields: ["procedureId"],
    fields: {
      voteResults: {
        merge(existing: VoteResult, incoming: VoteResult, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
      communityVotes: {
        merge(
          existing: CommunityVotes,
          incoming: CommunityVotes,
          { mergeObjects }
        ) {
          return mergeObjects(existing, incoming);
        },
      },
    },
  },
  Deputy: {
    keyFields: ["webId"],
    fields: {
      procedures: {
        keyArgs: ["procedureIds"],
        merge(
          existing: DeputyProcedure[] = [],
          incoming: DeputyProcedure[],
          { mergeObjects }
        ) {
          if (existing.length === 0) {
            return incoming;
          }
          return [...existing, ...incoming].map((deputyProcedure) => {
            const existingDeputyProcedure = existing.find(
              ({ procedure }) =>
                deputyProcedure.procedure.procedureId === procedure.procedureId
            );
            if (!existingDeputyProcedure) {
              return deputyProcedure;
            }
            return mergeObjects(existingDeputyProcedure, deputyProcedure);
          });
        },
      },
    },
  },
  VoteResult: {
    fields: {
      partyVotes: {
        merge(
          existing: PartyVote[] = [],
          incoming: PartyVote[],
          { mergeObjects }
        ) {
          if (existing.length === 0) {
            return incoming;
          }
          return incoming.map((partyVote) => {
            const existingPartyVote = existing.find(
              ({ party }) => partyVote.party === party
            );
            if (!existingPartyVote) {
              return partyVote;
            }
            return mergeObjects(existingPartyVote, partyVote);
          });
        },
      },
    },
  },
};
