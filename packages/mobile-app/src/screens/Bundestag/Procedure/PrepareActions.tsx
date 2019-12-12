import React, { PureComponent } from 'react';
import styled from 'styled-components/native';

import VoteButton from './components/VoteButton';
import ActionButton from './components/ActionButton';
import { Alert, Text } from 'react-native';

// GraphQL
// import client from '../../graphql/client';
// import VOTED from '../../graphql/queries/voted';
// import VOTE_SELECTION_LOCAL from '../../graphql/queries/local/voteSelection';
// import TOGGLE_NOTIFICATION from '../../graphql/mutations/toggleNotification';
// import GET_PROCEDURE from '../../graphql/queries/getProcedure';
// import ActivityIndexWrapper from '../../components/ActivityIndexWrapper';

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

// const LockIcon = styled(Ionicons).attrs(() => ({
//   size: 20,
//   name: 'ios-lock-outline',
//   color: 'grey',
// }))``;

// const InfoIcon = styled(Ionicons).attrs(() => ({
//   size: 35,
//   name: 'ios-information',
//   color: 'grey',
// }))`
//   margin-top: -4;
// `;

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

interface Props {
  verified: boolean;
  voted: boolean;
  voteSelection?: string;
  // procedureObjId: string;
  // procedureId: string;
  type: string;
  // refetch: () => void;
  // list: string;
  notify: boolean;
  share: () => void;
  // active: boolean;
}

class PrepareActions extends PureComponent<Props> {
  onComplete = () => {
    // this.props.refetch();
  };

  showUnknownVoteNotification = () => {
    Alert.alert(
      'Deine Stimme ist lokal verlorengegangen',
      'Für weitere Informationen schaue bitte ins FAQ',
    );
    // TODO link to FAQ
  };

  verify = () => {
    Alert.alert('go to verification');
    // TODO go to verification
  };

  render() {
    const {
      verified,
      voted,
      voteSelection,
      // procedureObjId,
      // procedureId,
      type,
      // list,
      notify,
      share,
      // active,
    } = this.props;
    return (
      <Wrapper>
        <SegmentWrapper>
          <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
          <TitleAddition>über {type}</TitleAddition>
        </SegmentWrapper>
        {!verified ? <VerificationTouch onPress={this.verify} /> : null}
        <VoteWrapper>
          {(!voted || (voted && voteSelection === 'YES')) && (
            <VoteButtonWrapper>
              <VoteButton
                voted={voted}
                selection="YES"
                voteSelection={voteSelection}
                onPress={() => {
                  // TODO go to verification screen
                  Alert.alert('go to verification screen');
                  // navigator.showModal({
                  //   screen: 'democracy.VoteVarification',
                  //   title: 'Zur Wahlurne'.toUpperCase(),
                  //   passProps: {
                  //     selection: 'YES',
                  //     procedureObjId,
                  //     procedureId,
                  //   },
                  // });
                }}
              />
              <VoteButtonLabel>
                {!voted ? 'Zustimmen' : 'Zugestimmt'}
              </VoteButtonLabel>
            </VoteButtonWrapper>
          )}
          {(!voted || (voted && voteSelection === 'ABSTINATION')) && (
            <VoteButtonWrapper>
              <VoteButton
                voted={voted}
                selection="ABSTINATION"
                voteSelection={voteSelection}
                onPress={() => {
                  // TODO go to verification screen
                  Alert.alert('go to verification screen');
                  // navigator.showModal({
                  //   screen: 'democracy.VoteVarification',
                  //   title: 'Zur Wahlurne'.toUpperCase(),
                  //   passProps: {
                  //     selection: 'ABSTINATION',
                  //     procedureObjId,
                  //     procedureId,
                  //   },
                  // });
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
                  // TODO go to verification screen
                  Alert.alert('go to verification screen');
                  // navigator.showModal({
                  //   screen: 'democracy.VoteVarification',
                  //   title: 'Zur Wahlurne'.toUpperCase(),
                  //   passProps: {
                  //     selection: 'NO',
                  //     procedureObjId,
                  //     procedureId,
                  //   },
                  // });
                }}
              />
              <VoteButtonLabel>
                {!voted ? 'Ablehnen' : 'Abgelehnt'}
              </VoteButtonLabel>
            </VoteButtonWrapper>
          )}

          {!voteSelection && voted && (
            <VoteButtonWrapper>
              <ActionButton
                selection="UNKNOWN"
                onPress={this.showUnknownVoteNotification}
              />
              <VoteButtonLabel>Abgestimmt</VoteButtonLabel>
              <LockIconWrapper>
                <Text>info icon</Text>
              </LockIconWrapper>
            </VoteButtonWrapper>
          )}
          {voted && (
            <VoteButtonWrapper>
              <ActionButton
                selection="NOTIFY"
                notify={notify}
                onPress={() => Alert.alert('Notify')}
              />
              <VoteButtonLabel>
                {notify ? 'Stumm schalten' : 'Benachrichtigen'}
              </VoteButtonLabel>
            </VoteButtonWrapper>
          )}
          {voted && (
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

export default PrepareActions;
