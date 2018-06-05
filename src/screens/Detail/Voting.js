import React from "react";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

import VoteButton from "../../components/VoteButton";

import VOTE_LOCAL from "../../graphql/mutations/voteLocal";
import VOTED from "../../graphql/queries/voted";
import VOTED_LOCAL from "../../graphql/queries/votedLocal";

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

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: 11;
  font-size: 12;
  color: rgb(150, 150, 150);
`;

const Title = styled.Text`
  flex: 1;
  font-size: 18;
`;

const Voting = ({
  voted,
  votedSelection,
  navigator,
  procedureObjId,
  procedureId
}) => (
    <Wrapper>
      <SegmentWrapper>
        <Title>{voted ? "Abgestimmt" : "Abstimmen"} </Title>
      </SegmentWrapper>
      <VoteWrapper>
        <VoteButtonWrapper>
          <VoteButton
            voted={voted}
            selection="YES"
            votedSelection={votedSelection}
            onPress={() => {
              navigator.showModal({
                screen: "democracy.VoteVarification",
                title: "Zur Wahlurne".toUpperCase(),
                passProps: {
                  selection: "YES",
                  procedureObjId,
                  procedureId
                }
              });
            }}
          />
          <VoteButtonLabel>{!voted ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
        </VoteButtonWrapper>
        <VoteButtonWrapper>
          <VoteButton
            voted={voted}
            selection="ABSTINATION"
            votedSelection={votedSelection}
            onPress={() => {
              navigator.showModal({
                screen: "democracy.VoteVarification",
                title: "Zur Wahlurne".toUpperCase(),
                passProps: {
                  selection: "ABSTINATION",
                  procedureObjId,
                  procedureId
                }
              });
            }}
          />
          <VoteButtonLabel>Enthalten</VoteButtonLabel>
        </VoteButtonWrapper>
        <VoteButtonWrapper>
          <VoteButton
            voted={voted}
            selection="NO"
            votedSelection={votedSelection}
            onPress={() => {
              navigator.showModal({
                screen: "democracy.VoteVarification",
                title: "Zur Wahlurne".toUpperCase(),
                passProps: {
                  selection: "NO",
                  procedureObjId,
                  procedureId
                }
              });
            }}
          />
          <VoteButtonLabel>{!voted ? 'Ablehnen' : 'Abgelehnt'}</VoteButtonLabel>
        </VoteButtonWrapper>
      </VoteWrapper>
    </Wrapper>
  );

Voting.propTypes = {
  voted: PropTypes.bool.isRequired,
  votedSelection: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  procedureObjId: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired
};

Voting.defaultProps = {
  votedSelection: undefined
};

export default compose(
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
