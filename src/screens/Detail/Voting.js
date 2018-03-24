import React from "react";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";

import VOTE from "../../graphql/mutations/vote";
import VOTE_LOCAL from "../../graphql/mutations/voteLocal";
import VOTED from "../../graphql/queries/voted";
import VOTES from "../../graphql/queries/votes";
import VOTED_LOCAL from "../../graphql/queries/votedLocal";
import GET_ACTIVITY_INDEX from "../../graphql/queries/activityIndex";

const SegmentWrapper = styled.View`
  padding-vertical: 10;
  padding-horizontal: 18;
  flex-direction: row;
  border-bottom-width: 1;
  border-bottom-color: rgba(68, 148, 211, 0.1);
  align-items: center;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const VoteWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 500;
  align-self: center;
  padding-horizontal: 18;
  padding-vertical: 11;
`;

const VoteIconButtonWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-color: rgba(21, 192, 99, 0.8);
  border-radius: ${65 / 2};
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled, selection, votedSelection }) => {
    if (disabled && selection !== votedSelection) {
      return "grey";
    }
    switch (selection) {
      case "YES":
        return "#15C063";
      case "ABSTINATION":
        return "#2C82E4";
      case "NO":
        return "#EC3E31";
      default:
        return "grey";
    }
  }};
`;

const VoteIconButton = styled.Image.attrs({
  flex: 1,
  source: require("../../../assets/icons/thumbsUp.png"),
  resizeMode: "contain",
  width: null,
  height: null
})`
  width: 30;
  height: 30;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 17;
`;

const Voting = ({ vote, voted, voteLocal, votedSelection }) => (
  <Wrapper>
    <SegmentWrapper>
      <Title>Abstimmen</Title>
    </SegmentWrapper>
    {/* <Content> */}
    <VoteWrapper>
      <VoteIconButtonWrapper
        disabled={voted}
        selection="YES"
        votedSelection={votedSelection}
        onPress={() => {
          vote("YES");
          voteLocal("YES");
        }}
      >
        <VoteIconButton />
      </VoteIconButtonWrapper>
      <VoteIconButtonWrapper
        style={{
          borderColor: "rgba(44, 130, 228, 0.8)"
        }}
        selection="ABSTINATION"
        votedSelection={votedSelection}
        disabled={voted}
        onPress={() => {
          vote("ABSTINATION");
          voteLocal("ABSTINATION");
        }}
      >
        <VoteIconButton
          style={{
            transform: [{ rotate: "-90deg" }]
          }}
        />
      </VoteIconButtonWrapper>
      <VoteIconButtonWrapper
        style={{
          borderColor: "rgba(236, 62, 49, 0.8)"
        }}
        selection="NO"
        votedSelection={votedSelection}
        disabled={voted}
        onPress={() => {
          vote("NO");
          voteLocal("NO");
        }}
      >
        <VoteIconButton
          style={{
            transform: [{ rotate: "180deg" }]
          }}
        />
      </VoteIconButtonWrapper>
    </VoteWrapper>
    {/* </Content> */}
  </Wrapper>
);

Voting.propTypes = {
  vote: PropTypes.func.isRequired,
  voteLocal: PropTypes.func.isRequired,
  voted: PropTypes.bool.isRequired,
  votedSelection: PropTypes.string
};

Voting.defaultProps = {
  votedSelection: undefined
};

export default compose(
  graphql(VOTE, {
    props({ ownProps: { procedureObjId, procedureId }, mutate }) {
      return {
        vote: selection =>
          mutate({
            variables: { procedure: procedureObjId, selection },
            optimisticResponse: {
              __typename: "Mutation",
              vote: {
                __typename: "Vote",
                voted: true
              }
            },
            update: (proxy, { data: { vote: { voted } } }) => {
              const data = proxy.readQuery({
                query: VOTED,
                variables: { procedure: procedureObjId }
              });
              data.votes.voted = voted;
              proxy.writeQuery({
                query: VOTED,
                variables: { procedure: procedureObjId },
                data
              });
              const activityData = proxy.readQuery({
                query: GET_ACTIVITY_INDEX,
                variables: { procedureId }
              });
              if (!activityData.activityIndex.active) {
                activityData.activityIndex.active = true;
                activityData.activityIndex.activityIndex += 1;
                proxy.writeQuery({
                  query: GET_ACTIVITY_INDEX,
                  variables: { procedureId },
                  data: activityData
                });
              }
            },
            refetchQueries: [
              {
                query: VOTES,
                variables: { procedure: procedureObjId }
              }
            ]
          })
      };
    }
  }),

  graphql(VOTED, {
    options: ({ procedureObjId }) => ({
      variables: { procedure: procedureObjId },
      fetchPolicy: "cache-and-network"
    }),
    props: ({ data: { loading, votes } }) => ({
      voted: loading ? true : votes.voted
    })
  }),

  graphql(VOTE_LOCAL, {
    name: "voteLocal",
    props({ ownProps: { procedureObjId }, voteLocal }) {
      return {
        voteLocal: selection =>
          voteLocal({
            variables: { procedure: procedureObjId, selection },
            refetchQueries: [
              {
                query: VOTED_LOCAL,
                variables: { procedure: procedureObjId }
              }
            ]
          })
      };
    }
  }),
  graphql(VOTED_LOCAL, {
    options: ({ procedureObjId }) => ({
      variables: { procedure: procedureObjId }
    }),
    props: ({ data: { votedLocal } }) => {
      if (votedLocal) {
        return { votedSelection: votedLocal.selection };
      }
      return {};
    }
  })
)(Voting);
