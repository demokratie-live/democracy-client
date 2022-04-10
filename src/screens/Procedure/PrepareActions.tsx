import React from 'react';

import VoteButton from './components/VoteButton';
import ActionButton from './components/ActionButton';
import { Alert } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { SidebarParamList } from '../../routes/Sidebar';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from '../../routes';
import styled from 'styled-components/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { BundestagTopTabParamList } from '../../routes/Bundestag';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../api/state/constituency';
import { localVoteState } from '../../api/state/votesLocal';
import {
  ProcedureDocument,
  ProcedureQuery,
  ProcedureQueryVariables,
  useToggleNotificationMutation,
  VoteSelection,
} from '../../__generated__/graphql';
import SvgLock from '../../components/Icons/Lock';

const SegmentWrapper = styled.View`
  padding-vertical: 14px;
  padding-horizontal: 18px;
  flex-direction: row;
  border-bottom-width: 1px;
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
  max-width: 500px;
  align-self: center;
  padding-horizontal: 18px;
  padding-vertical: 11px;
`;

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: 11px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Title = styled.Text`
  font-size: 18px;
`;

const TitleAddition = styled.Text`
  font-size: 18px;
  color: grey;
  padding-left: 5px;
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
//   margin-top: -4px;
// `;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3px;
  right: -3px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border-width: 1px;
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
  title: string;
}

type DetailScreenNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    BundestagTopTabParamList,
    'Empfohlen' | 'Sitzungswoche' | 'Top 100' | 'Vergangen'
  >,
  CompositeNavigationProp<
    DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
    NativeStackNavigationProp<RootStackParamList, 'Sidebar'>
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
  title,
}) => {
  const { constituency } = useRecoilValue(constituencyState);
  const constituencies = constituency ? [constituency] : [];
  const voteSelection = useRecoilValue(localVoteState(procedureId))?.selection;
  const [toggleNotification] = useToggleNotificationMutation({
    variables: {
      procedureId,
    },
    refetchQueries: [
      {
        query: ProcedureDocument,
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
    navigation.navigate('VerificationStart');
  };

  const voted = votedServer || !!voteSelection;
  return (
    <Wrapper>
      <SegmentWrapper>
        <Title>{voted ? 'Abgestimmt' : 'Abstimmen'}</Title>
        <TitleAddition>über {type}</TitleAddition>
      </SegmentWrapper>
      {!verified ? <VerificationTouch onPress={verify} testID="VerificationTouch" /> : null}
      <VoteWrapper>
        {(!voted || (voted && voteSelection === 'YES')) && (
          <VoteButtonWrapper>
            <VoteButton
              voted={voted}
              selection="YES"
              voteSelection={voteSelection}
              onPress={() => {
                navigation.navigate('Voting', {
                  selection: VoteSelection.Yes,
                  procedureId,
                  procedureObjId,
                  title,
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
                navigation.navigate('Voting', {
                  selection: VoteSelection.Abstination,
                  procedureId,
                  procedureObjId,
                  title,
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
                  selection: VoteSelection.No,
                  procedureId,
                  procedureObjId,
                  title,
                });
              }}
            />
            <VoteButtonLabel>{!voted ? 'Ablehnen' : 'Abgelehnt'}</VoteButtonLabel>
          </VoteButtonWrapper>
        )}

        {!voteSelection && voted && (
          <VoteButtonWrapper>
            <ActionButton selection="UNKNOWN" onPress={showUnknownVoteNotification} />
            <VoteButtonLabel>Abgestimmt</VoteButtonLabel>
            <LockIconWrapper>
              <SvgLock width={18} height={18} color="#bbb" />
            </LockIconWrapper>
          </VoteButtonWrapper>
        )}
        {voted && (
          <VoteButtonWrapper>
            <ActionButton
              selection="NOTIFY"
              notify={notify}
              onPress={() => {
                toggleNotification({
                  optimisticResponse: {
                    toggleNotification: {
                      __typename: 'Procedure',
                      notify: !notify,
                    },
                  },
                  update: (proxy, { data: mutationData }) => {
                    const data = proxy.readQuery<ProcedureQuery, ProcedureQueryVariables>({
                      query: ProcedureDocument,
                      variables: {
                        id: procedureId,
                        constituencies,
                      },
                    });

                    if (data && mutationData && mutationData.toggleNotification) {
                      proxy.writeQuery({
                        query: ProcedureDocument,
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
                });
              }}
            />
            <VoteButtonLabel>{notify ? 'Stumm schalten' : 'Benachrichtigen'}</VoteButtonLabel>
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
