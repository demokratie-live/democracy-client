import { TypedTypePolicies } from '../../__generated/apollo-helpers';
import { Procedure_procedure_voteResults_partyVotes } from '../../screens/Bundestag/Procedure/graphql/query/__generated__/Procedure';
import { uniqBy } from 'lodash';
import { Deputies_deputies } from '../../screens/Abgeordnete/graphql/query/__generated__/Deputies';

export const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      procedures: {
        keyArgs: ['listTypes', 'sort', 'filter'],
        merge(existing = [], incoming: any[]) {
          return uniqBy([...existing, ...incoming], procedure => {
            return procedure.procedureId || procedure.__ref;
          });
        },
      },
      deputies: {
        keyArgs: [
          'filterTerm',
          'excludeIds',
          'filterIds',
          'filterConstituency',
        ],
        merge(existing = { data: [] }, incoming: Deputies_deputies) {
          return {
            ...incoming,
            data: uniqBy([...existing.data, ...incoming.data], deputy => {
              return deputy.__ref;
            }),
          };
        },
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
            return (
              deputyProcedure.procedure.procedureId ||
              deputyProcedure.procedure.__ref
            );
          });
        },
      },
    },
  },
  VoteResult: {
    fields: {
      partyVotes: {
        merge(
          existing: Procedure_procedure_voteResults_partyVotes[] = [],
          incoming: Procedure_procedure_voteResults_partyVotes[],
          { mergeObjects },
        ) {
          if (existing.length === 0) {
            return incoming;
          }
          return incoming.map(partyVote => {
            const existingPartyVote = existing.find(
              ({ party }) => partyVote.party === party,
            );
            if (!existingPartyVote) {
              return partyVote;
            }
            return mergeObjects(existingPartyVote as any, partyVote);
          });
        },
      },
    },
  },
};
