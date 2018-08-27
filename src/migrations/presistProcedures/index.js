import gql from "graphql-tag";

import client from "../../graphql/client";
import VotesLocal from "../../services/VotesLocal";

import VOTES_LOCAL from "../../graphql/queries/votesLocal";

export default async () => {
  const { votesLocal } = client.readQuery({
    query: VOTES_LOCAL
  });
  if (votesLocal.length > 0) {
    const { data: { proceduresById } } = await client.query({
      query: gql`
        query proceduresById($ids: [String!]!) {
          proceduresById(ids: $ids) {
            _id
            procedureId
          }
        }
      `,
      variables: {
        ids: votesLocal.map(({ procedure }) => procedure)
      }
    });

    await VotesLocal.setVoteLocalList(
      proceduresById.map(({ _id, procedureId }) => {
        const { selection } = votesLocal.find(
          ({ procedure }) => procedure === _id
        );
        return { procedureId, selection };
      })
    );
    return true;
  }
  return false;
};
