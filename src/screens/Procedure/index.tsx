import React, { useContext, FC, useEffect, useCallback, useMemo } from 'react';
import { Text, Platform, Share } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import speakingurl from 'speakingurl';
import { Intro } from './components/Intro';
import Details from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { CommunityVoteResults } from './components/CommunityVoteResults';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';
import PrepareActions from './PrepareActions';
import { MenuButton } from '../../components/MenuButton';
import { RootStackParamList } from '../../routes';
import { CountryMap } from './components/CountryMap';
import { DeputyVoteResultSlider } from './components/DeputyVoteResults';
import styled from 'styled-components/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SvgShareIosHeader from '../../components/Icons/ShareIosHeader';
import SvgShare from '../../components/Icons/Share';
import { NotificationsContext } from '../../api/state/notificationPermission';
import { useInitialState } from '../../api/state/initialState';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../api/state/constituency';
import {
  Procedure,
  ProcedureDocument,
  ProcedureQuery,
  ProcedureQueryVariables,
  useProcedureQuery,
  useToggleNotificationMutation,
} from '../../__generated__/graphql';
import { getShareLink } from '../../lib/shareLink';
import SvgBellHeader from '../../components/Icons/BellHeader';
import SvgBellFilledHeader from '../../components/Icons/BellFilledHeader';
import { Centered } from '../../components/Centered';
import { Button } from '../../components/Button';
import { ListLoading } from '../../components/ListLoading';
import Folding from '../../components/Folding';

const Container = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: #fff;
`;

const HaderRightWrapper = styled.View`
  flex-direction: row;
  padding-right: 11px;
`;

const DetailsContainer = styled.View`
  padding-horizontal: 8px;
  margin-top: 18px;
  padding-vertical: 11px;
  border-top-width: 1px;
  border-color: rgba(68, 148, 211, 0.1);
`;

type ProcedureScreenRouteProp = RouteProp<RootStackParamList, 'Procedure'>;

type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: ProcedureScreenRouteProp;
  navigation: ScreenNavigationProp;
};

const ShareComponent = Platform.OS === 'ios' ? SvgShareIosHeader : SvgShare;

export const ProcedureScreen: FC<Props> = ({ route, navigation }) => {
  const { notificationSettings, hasPermissions } = useContext(NotificationsContext);
  const { isVerified } = useInitialState();
  const constituency = useRecoilValue(constituencyState);
  const constituencies = useMemo(() => (constituency ? [constituency] : []), [constituency]);
  const { data, loading, error, refetch } = useProcedureQuery({
    variables: {
      id: route.params.procedureId,
      constituencies,
    },
  });
  const share = ({
    type,
    procedureId,
    title,
  }: Pick<Procedure, 'type' | 'procedureId' | 'title'>) => {
    const url = `${getShareLink()}/${type.toLowerCase()}/${procedureId}/${speakingurl(title)}`;
    const message = Platform.OS === 'ios' ? title : `${title} – ${url}`;
    Share.share(
      {
        message,
        url,
        title: 'Weil Deine Stimme Zählt!',
      },
      {
        // Android only:
        dialogTitle: title,
      },
    );
  };

  const [toggleNotification] = useToggleNotificationMutation({
    variables: {
      procedureId: route.params.procedureId,
    },
    refetchQueries: [
      {
        query: ProcedureDocument,
        variables: {
          id: route.params.procedureId,
        },
      },
    ],
  });

  const clickBell = useCallback(() => {
    if (!notificationSettings.enabled || !notificationSettings.outcomePushs || !hasPermissions) {
      navigation.navigate('NotificationInstruction', {
        done: () => {
          toggleNotification();
        },
        title: data?.procedure.title,
      });
    } else {
      if (data) {
        toggleNotification({
          optimisticResponse: {
            toggleNotification: {
              __typename: 'Procedure',
              notify: !data.procedure.notify,
            },
          },
          update: (proxy, { data: mutationData }) => {
            const procedureData = proxy.readQuery<ProcedureQuery, ProcedureQueryVariables>({
              query: ProcedureDocument,
              variables: {
                id: route.params.procedureId,
                constituencies,
              },
            });
            if (procedureData && mutationData && mutationData.toggleNotification) {
              proxy.writeQuery({
                query: ProcedureDocument,
                variables: {
                  id: route.params.procedureId,
                  constituencies,
                },
                data: {
                  ...procedureData,
                  procedure: {
                    ...procedureData.procedure,
                    notify: mutationData.toggleNotification.notify,
                  },
                },
              });
            }
          },
        });
      }
    }
  }, [
    constituencies,
    data,
    hasPermissions,
    navigation,
    notificationSettings.enabled,
    notificationSettings.outcomePushs,
    route.params.procedureId,
    toggleNotification,
  ]);

  useEffect(() => {
    if (data) {
      const { notify, type, procedureId, title } = data.procedure;
      const BellIcon = !notify ? SvgBellHeader : SvgBellFilledHeader;
      navigation.setOptions({
        headerRight: () => (
          <HaderRightWrapper>
            <MenuButton onPress={clickBell}>
              <BellIcon width={20} height={20} color="#fff" />
            </MenuButton>
            <MenuButton onPress={() => share({ type, procedureId, title })}>
              <ShareComponent width={20} height={20} color="#fff" />
            </MenuButton>
          </HaderRightWrapper>
        ),
      });
    }
  }, [navigation, data, toggleNotification, clickBell]);

  useEffect(() => {
    if (!route.params.title && data && data.procedure.type) {
      navigation.setOptions({
        title: data.procedure.type,
      });
    }
  }, [data, route, navigation]);

  if (loading) {
    return <ListLoading />;
  }
  if (error || !data) {
    return (
      <Centered>
        <Text>Verbindungsfehler</Text>
        <Button
          onPress={() => {
            refetch({
              id: route.params.procedureId,
              constituencies,
            });
          }}
          text="Nochmal versuchen"
          textColor="blue"
          backgroundColor="transparent"
        />
      </Centered>
    );
  }

  const {
    _id,
    title,
    voteDate,
    voteEnd,
    procedureId,
    type,
    subjectGroups,
    submissionDate,
    abstract,
    currentStatus,
    importantDocuments,
    currentStatusHistory,
    communityVotes,
    voteResults,
    voted,
    notify,
  } = data.procedure;

  return (
    <Container testID="ProcedureScrollView">
      <Intro
        {...data.procedure}
        voteDate={data.procedure.voteDate ? new Date(data.procedure.voteDate) : undefined}
        voteEnd={data.procedure.voteEnd ? new Date(data.procedure.voteEnd) : undefined}
        sessionTOPHeading={data.procedure.sessionTOPHeading ?? undefined}
        votedGovernment={data.procedure.votedGovernment ?? false}
      />
      <DetailsContainer>
        <Details
          subjectGroups={subjectGroups}
          submissionDate={String(submissionDate)}
          dateVote={voteDate ?? undefined}
          abstract={abstract || null}
          procedureId={procedureId}
          currentStatus={currentStatus || null}
          type={type}
        />
      </DetailsContainer>
      <Folding title="Dokumente">
        <Documents documents={importantDocuments} />
      </Folding>
      {currentStatusHistory.length > 0 && (
        <Folding title="Gesetzesstand">
          <History history={currentStatusHistory} currentStatus={currentStatus} />
        </Folding>
      )}

      {communityVotes && ((voteEnd && new Date(voteEnd) < new Date()) || voted) && (
        <CommunityVoteResults
          countryMap={<CountryMap key="countryMap" {...{ procedureId }} />}
          voteResults={communityVotes}
          voted={voted}
        />
      )}
      {voteResults && (
        <GovernmentVoteResults
          key="government"
          voteResults={voteResults}
          currentStatus={currentStatus}
          voted={voted}
        />
      )}
      {voteResults?.namedVote && currentStatus !== 'Zurückgezogen' && (
        <DeputyVoteResultSlider
          key="deputies"
          voteResults={voteResults}
          voted={voted}
          procedureId={procedureId}
        />
      )}
      <PrepareActions
        verified={isVerified}
        type={type}
        voted={voted}
        share={() => share({ type, procedureId, title })}
        notify={!!notify}
        procedureId={procedureId}
        procedureObjId={_id}
        title={title}
      />
    </Container>
  );
};
