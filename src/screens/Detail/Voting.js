import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

import VoteButton from '../../components/VoteButton';

import VOTED from '../../graphql/queries/voted';
import VOTE_SELECTION_LOCAL from '../../graphql/queries/local/voteSelection';

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
  font-size: 18;
`;

const TitleAddition = styled.Text`
  font-size: 18;
  color: grey;
  padding-left: 5;
`;

const VerificationTouch = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
`;

class Voting extends Component {
  onComplete = () => {
    this.props.refetch();
  };
  render() {
    const {
      verified,
      voted,
      voteSelection,
      navigator,
      procedureObjId,
      procedureId,
      type,
    } = this.props;
    return (
      <Wrapper>
        <SegmentWrapper>
          <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
          <TitleAddition>über {type}</TitleAddition>
        </SegmentWrapper>
        {verified ? null : (
          <VerificationTouch
            onPress={() => {
              navigator.showModal({
                screen: 'democracy.SmsVerification',
                passProps: {
                  procedureId,
                  onComplete: this.onComplete,
                },
              });
            }}
          />
        )}
        <VoteWrapper>
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="YES"
              voteSelection={voteSelection}
              onPress={() => {
                navigator.showModal({
                  screen: 'democracy.VoteVarification',
                  title: 'Zur Wahlurne'.toUpperCase(),
                  passProps: {
                    selection: 'YES',
                    procedureObjId,
                    procedureId,
                  },
                });
              }}
            />
            <VoteButtonLabel>{!voted ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
          </VoteButtonWrapper>
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="ABSTINATION"
              voteSelection={voteSelection}
              onPress={() => {
                navigator.showModal({
                  screen: 'democracy.VoteVarification',
                  title: 'Zur Wahlurne'.toUpperCase(),
                  passProps: {
                    selection: 'ABSTINATION',
                    procedureObjId,
                    procedureId,
                  },
                });
              }}
            />
            <VoteButtonLabel>Enthalten</VoteButtonLabel>
          </VoteButtonWrapper>
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="NO"
              voteSelection={voteSelection}
              onPress={() => {
                navigator.showModal({
                  screen: 'democracy.VoteVarification',
                  title: 'Zur Wahlurne'.toUpperCase(),
                  passProps: {
                    selection: 'NO',
                    procedureObjId,
                    procedureId,
                  },
                });
              }}
            />
            <VoteButtonLabel>{!voted ? 'Ablehnen' : 'Abgelehnt'}</VoteButtonLabel>
          </VoteButtonWrapper>
        </VoteWrapper>
      </Wrapper>
    );
  }
}

Voting.propTypes = {
  verified: PropTypes.bool.isRequired,
  voted: PropTypes.bool.isRequired,
  voteSelection: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  procedureObjId: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};

Voting.defaultProps = {
  voteSelection: undefined,
};

export default compose(
  graphql(VOTED, {
    options: ({ procedureObjId }) => ({
      variables: { procedure: procedureObjId },
      fetchPolicy: 'cache-and-network',
    }),
    props: ({ data: { loading, votes, refetch } }) => ({
      voted: !loading && votes ? votes.voted : true,
      refetch,
    }),
  }),

  graphql(VOTE_SELECTION_LOCAL, {
    options: ({ procedureId }) => ({
      variables: { procedureId },
      // fetchPolicy: 'cache-and-network',
    }),
    props: props => {
      const {
        data: { voteSelectionLocal },
      } = props;
      if (voteSelectionLocal) {
        return { voteSelection: voteSelectionLocal.selection };
      }
      return {};
    },
  }),
)(Voting);
