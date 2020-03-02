import React, { useContext } from 'react';
import styled from 'styled-components/native';

import VoteButton from './components/VoteButton';
import ActionButton from './components/ActionButton';
import { Alert } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import { VoteSelection } from '../../../../__generated__/globalTypes';
import { LocalVotesContext } from '../../../context/LocalVotes';
import { RootStackParamList } from '../../../routes';
import { SidebarParamList } from '../../../routes/Sidebar';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useMutation } from '@apollo/react-hooks';
import Lock from '@democracy-deutschland/mobile-ui/src/components/Icons/Lock';
import {
  ToggleNotification,
  ToggleNotificationVariables,
} from './graphql/muatation/__generated__/ToggleNotification';
import { TOGGLE_NOTIFICATION } from './graphql/muatation/toggleNotification';
import { PROCEDURE } from './graphql/query/Procedure';
import {
  Procedure as ProcedureQuery,
  ProcedureVariables,
} from './graphql/query/__generated__/Procedure';
import { ConstituencyContext } from '../../../context/Constituency';

const SegmentWrapper = styled.View`
  padding-vertical: 14;
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
  procedureObjId: string;
  procedureId: string;
  type: string;
  // refetch: () => void;
  // list: string;
  notify: boolean;
  share: () => void;
  // active: boolean;
}

type DetailScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
  CompositeNavigationProp<
    DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
    StackNavigationProp<RootStackParamList>
  >
>;

const PrepareActions: React.FC<Props> = ({
  verified,
  voted: votedServer,
  procedureObjId,
  procedureId,
  type,
  // list,
  notify,
  share,
  // active,
}) => {
  const { constituency } = useContext(ConstituencyContext);
  const constituencies = constituency ? [constituency] : [];
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const [toggleNotification] = useMutation<
    ToggleNotification,
    ToggleNotificationVariables
  >(TOGGLE_NOTIFICATION, {
    variables: {
      procedureId,
    },
    refetchQueries: [
      {
        query: PROCEDURE,
        variables: {
          id: procedureId,
        },
      },
    ],
  });
  const navigation = useNavigation<DetailScreenNavigationProps>();

  const showUnknownVoteNotification = () => {
    Alert.alert(
      'Deine Stimme ist lokal verlorengegangen',
      'Für weitere Informationen schaue bitte ins FAQ',
    );
    // TODO link to FAQ
  };

  const verify = () => {
    navigation.navigate('Verification', { procedureId });
    // TODO go to verification
  };

  const voteSelection = getLocalVoteSelection(procedureId);
  const voted = votedServer || !!voteSelection;
  return (
    <Wrapper>
      <SegmentWrapper>
        <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
        <TitleAddition>über {type}</TitleAddition>
      </SegmentWrapper>
      {!verified ? <VerificationTouch onPress={verify} /> : null}
      <VoteWrapper>
        {(!voted || (voted && voteSelection === 'YES')) && (
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="YES"
              voteSelection={voteSelection}
              onPress={() => {
                navigation.navigate('Voting', {
                  selection: VoteSelection.YES,
                  procedureId,
                  procedureObjId,
                });
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
                navigation.navigate('Voting', {
                  selection: VoteSelection.ABSTINATION,
                  procedureId,
                  procedureObjId,
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
                navigation.navigate('Voting', {
                  selection: VoteSelection.NO,
                  procedureId,
                  procedureObjId,
                });
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
              onPress={showUnknownVoteNotification}
            />
            <VoteButtonLabel>Abgestimmt</VoteButtonLabel>
            <LockIconWrapper>
              <Lock width={18} height={18} color="#bbb" />
            </LockIconWrapper>
          </VoteButtonWrapper>
        )}
        {voted && (
          <VoteButtonWrapper>
            <ActionButton
              selection="NOTIFY"
              notify={notify}
              onPress={() =>
                toggleNotification({
                  optimisticResponse: {
                    toggleNotification: {
                      __typename: 'Procedure',
                      notify: !notify,
                    },
                  },
                  update: (proxy, { data: mutationData }) => {
                    const data = proxy.readQuery<
                      ProcedureQuery,
                      ProcedureVariables
                    >({
                      query: PROCEDURE,
                      variables: {
                        id: procedureId,
                        constituencies,
                      },
                    });
                    if (
                      data &&
                      mutationData &&
                      mutationData.toggleNotification
                    ) {
                      proxy.writeQuery({
                        query: PROCEDURE,
                        variables: {
                          id: procedureId,
                          constituencies,
                        },
                        data: {
                          ...data,
                          procedure: {
                            ...data.procedure,
                            notify: mutationData.toggleNotification.notify,
                          },
                        },
                      });
                    }
                  },
                })
              }
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
};

export default PrepareActions;
