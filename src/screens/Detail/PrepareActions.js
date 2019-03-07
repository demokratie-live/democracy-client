import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { graphql, compose, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import VoteButton from '../../components/VoteButton';
import ActionButton from '../../components/ActionButton';

// GraphQL
import client from '../../graphql/client';
import VOTED from '../../graphql/queries/voted';
import VOTE_SELECTION_LOCAL from '../../graphql/queries/local/voteSelection';
import TOGGLE_NOTIFICATION from '../../graphql/mutations/toggleNotification';
import GET_PROCEDURE from '../../graphql/queries/getProcedure';
import ActivityIndexWrapper from '../../components/ActivityIndexWrapper';

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
  justify-content: flex-end;
`;

const VoteWrapper = styled.View`
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

const LockIcon = styled(Ionicons).attrs(() => ({
  size: 20,
  name: 'ios-lock-outline',
  color: 'grey',
}))``;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3;
  right: -3;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30;
  height: 30;
  align-items: center;
  justify-content: center;
  border-radius: 14;
  border-width: 1;
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
`;

class Voting extends PureComponent {
  onComplete = () => {
    this.props.refetch();
  };

  onCompleteActivityIndex = () => {
    this.props.refetch();
    client.query({
      query: GET_PROCEDURE,
      variables: {
        procedureId: this.props.procedureId,
      },
    });
  };

  notifyOR = ({ notify }) => {
    return {
      __typename: 'Mutation',
      toggleNotification: {
        __typename: 'Procedure',
        notify: !notify,
      },
    };
  };

  notifyUpdate = ({ procedureId }) => (
    cache,
    {
      data: {
        toggleNotification: { notify: newNotify },
      },
    },
  ) => {
    const data = cache.readQuery({
      query: GET_PROCEDURE,
      variables: { id: procedureId },
    });
    data.procedure.notify = newNotify;
    cache.writeQuery({
      query: GET_PROCEDURE,
      variables: { id: procedureId },
      data,
    });
  };

  verify = activityIndex => {
    const { navigator, procedureId } = this.props;
    navigator.showModal({
      screen: 'democracy.SmsVerification',
      passProps: {
        procedureId,
        onComplete: activityIndex ? this.onCompleteActivityIndex : this.onComplete,
      },
    });
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
      list,
      notify,
      share,
      active,
    } = this.props;
    return (
      <Wrapper>
        {list !== 'PREPARATION' && (
          <SegmentWrapper>
            <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
            <TitleAddition>über {type}</TitleAddition>
          </SegmentWrapper>
        )}
        {!verified && list !== 'PREPARATION' ? <VerificationTouch onPress={this.verify} /> : null}
        <VoteWrapper>
          {list !== 'PREPARATION' && (
            <>
              {(!voted || (voted && voteSelection === 'YES')) && (
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
              )}
              {(!voted || (voted && voteSelection === 'ABSTINATION')) && (
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
              )}
              {(!voted || (voted && voteSelection === 'NO')) && (
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
              )}
            </>
          )}

          {!voteSelection && voted && (
            <VoteButtonWrapper>
              <ActionButton selection="UNKNOWN" />
              <VoteButtonLabel>Abgestimmt</VoteButtonLabel>
            </VoteButtonWrapper>
          )}

          {list === 'PREPARATION' && (
            <ActivityIndexWrapper
              procedureId={procedureId}
              verified={verified}
              active={active}
              touchable
            >
              {({ onPress }) => (
                <VoteButtonWrapper>
                  <ActionButton
                    selection="ACTIVITY_INDEX"
                    onPress={() => (verified ? onPress && onPress() : this.verify(true))}
                    procedureId={procedureId}
                  />
                  <VoteButtonLabel>UpVote</VoteButtonLabel>
                  {active && (
                    <LockIconWrapper>
                      <LockIcon />
                    </LockIconWrapper>
                  )}
                </VoteButtonWrapper>
              )}
            </ActivityIndexWrapper>
          )}
          {(list === 'PREPARATION' || voted) && (
            <Mutation
              mutation={TOGGLE_NOTIFICATION}
              variables={{ procedureId: procedureId }}
              optimisticResponse={this.notifyOR({ notify })}
              update={this.notifyUpdate({ procedureId })}
            >
              {toggleNotification => (
                <VoteButtonWrapper>
                  <ActionButton
                    selection="NOTIFY"
                    notify={notify}
                    onPress={() => toggleNotification()}
                  />
                  <VoteButtonLabel>{notify ? 'Stumm schalten' : 'Benachrichtigen'}</VoteButtonLabel>
                </VoteButtonWrapper>
              )}
            </Mutation>
          )}
          {(list === 'PREPARATION' || voted) && (
            <VoteButtonWrapper>
              <ActionButton selection="SHARE" onPress={share} />
              <VoteButtonLabel>Teilen</VoteButtonLabel>
            </VoteButtonWrapper>
          )}
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
  list: PropTypes.string.isRequired,
  notify: PropTypes.bool.isRequired,
  share: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
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
