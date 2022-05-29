import { uniqBy } from 'lodash';
import { Procedure, TypedTypePolicies, VoteResult } from '../../__generated__/graphql';

export const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      procedures: {
        keyArgs: ['listTypes', 'sort', 'filter', 'period'],
        merge(existing: Procedure[] = [], incoming: Procedure[]) {
          return uniqBy(
            [...existing, ...incoming],
            procedure => procedure.procedureId ?? (procedure as unknown as { __ref: string }).__ref,
          );
        },
      },
      // deputies: {
      //   keyArgs: ['filterTerm', 'excludeIds', 'filterIds', 'filterConstituency', 'period'],
      //   merge(existing = { data: [] }, incoming: Deputies_deputies) {
      //     return {
      //       ...incoming,
      //       data: uniqBy([...existing.data, ...incoming.data], deputy => {
      //         return deputy.__ref;
      //       }),
      //     };
      //   },
      // },
      deputy: {
        keyArgs: ['id', 'votedProcedureIds'],
      },
    },
  },
  Procedure: {
    keyFields: ['procedureId'],
    fields: {
      voteResults: {
        merge(existing: VoteResult, incoming: VoteResult, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
    },
  },
  // Deputy: {
  //   keyFields: ['webId'],
  //   fields: {
  //     procedures: {
  //       keyArgs: ['procedureIds'],
  //       merge(existing: DeputyProcedure[] = [], incoming: DeputyProcedure[]) {
  //         return uniqBy([...existing, ...incoming], deputyProcedure => {
  //           return deputyProcedure.procedure.procedureId;
  //         });
  //       },
  //     },
  //   },
  // },
  // VoteResult: {
  //   fields: {
  //     partyVotes: {
  //       merge(
  //         existing: Procedure_procedure_voteResults_partyVotes[] = [],
  //         incoming: Procedure_procedure_voteResults_partyVotes[],
  //         { mergeObjects },
  //       ) {
  //         if (existing.length === 0) {
  //           return incoming;
  //         }
  //         return incoming.map(partyVote => {
  //           const existingPartyVote = existing.find(({ party }) => partyVote.party === party);
  //           if (!existingPartyVote) {
  //             return partyVote;
  //           }
  //           return mergeObjects(existingPartyVote, partyVote);
  //         });
  //       },
  //     },
  //   },
  // },
};
