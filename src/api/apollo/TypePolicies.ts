/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { uniqBy } from 'lodash';
import { TypedTypePolicies } from '../../__generated__/graphql';

export const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      procedures: {
        keyArgs: ['listTypes', 'sort', 'filter', 'period'],
        merge(existing = [], incoming: any[]) {
          return uniqBy([...existing, ...incoming], procedure => {
            return procedure.procedureId || procedure.__ref;
          });
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
    fields: {
      voteResults: {
        merge(existing, incoming, { mergeObjects }) {
          return mergeObjects(existing, incoming);
        },
      },
    },
  },
  Deputy: {
    fields: {
      procedures: {
        keyArgs: ['procedureIds'],
        merge(existing = [], incoming: any[]) {
          return uniqBy([...existing, ...incoming], deputyProcedure => {
            return deputyProcedure.procedure.procedureId || deputyProcedure.procedure.__ref;
          });
        },
      },
    },
  },
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
