import React from "react";
import styled from "styled-components/native";
import { graphql, compose } from "react-apollo";
import PropTypes from "prop-types";

import VOTE from "../../graphql/mutations/vote";
import VOTED from "../../graphql/queries/voted";

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
`;

const VoteButtonWrapper = styled.TouchableOpacity``;

const VoteButton = styled.Image``;

const Title = styled.Text`
  flex: 1;
  font-size: 17;
`;

const Content = styled.View`
  display: flex;
  padding-horizontal: 16;
  padding-vertical: 10;
`;

const Voting = ({ vote, procedure, voted }) => (
    <Wrapper>
      <SegmentWrapper>
        <Title>Abstimmen</Title>
      </SegmentWrapper>
      <Content>
        <VoteWrapper>
          <VoteButtonWrapper
            disabled={voted}
            onPress={() => vote({ variables: { procedure, selection: "YES" } })}
          >
            <VoteButton source={require("../../../assets/icons/voteYes.png")} />
          </VoteButtonWrapper>
          <VoteButtonWrapper
            disabled={voted}
            onPress={() =>
              vote({ variables: { procedure, selection: "ABSTINATION" } })
            }
          >
            <VoteButton
              source={require("../../../assets/icons/voteAbstention.png")}
            />
          </VoteButtonWrapper>
          <VoteButtonWrapper
            disabled={voted}
            onPress={() => vote({ variables: { procedure, selection: "NO" } })}
          >
            <VoteButton source={require("../../../assets/icons/voteNo.png")} />
          </VoteButtonWrapper>
        </VoteWrapper>
      </Content>
    </Wrapper>
  );

Voting.propTypes = {
  vote: PropTypes.func.isRequired,
  procedure: PropTypes.string.isRequired,
  voted: PropTypes.bool.isRequired
};

export default compose(
  graphql(VOTE, {
    name: "vote"
  }),
  graphql(VOTED, {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: ({ data: { loading, votes } }) => ({
      voted: loading ? true : votes.voted
    })
  })
)(Voting);
