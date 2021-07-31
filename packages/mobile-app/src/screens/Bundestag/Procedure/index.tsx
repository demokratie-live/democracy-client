import React, { useContext, FC, useEffect, useCallback } from 'react';
import { Text, Platform, Share } from 'react-native';
import { RouteProp } from '@react-navigation/core';

import ShareIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Share';
import ShareIconIosHeader from '@democracy-deutschland/mobile-ui/src/components/Icons/ShareIosHeader';

import { useQuery, useMutation } from '@apollo/client';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import speakingurl from 'speakingurl';
import {
  Procedure as ProcedureQueryObj,
  ProcedureVariables,
  Procedure_procedure,
} from './graphql/query/__generated__/Procedure';
import { PROCEDURE } from './graphql/query/Procedure';
import { Intro } from './components/Intro';
import Details from './components/Details';
import Documents from './components/Documents';
import { History } from './components/History';
import { CommunityVoteResults } from './components/CommunityVoteResults';
import { GovernmentVoteResults } from './components/GovernmentVoteResults';
import PrepareActions from './PrepareActions';
import { InitialStateContext } from '../../../context/InitialStates';
import { getShareLink } from '../../../lib/shareLink';
import { ConstituencyContext } from '../../../context/Constituency';
import { Centered } from '@democracy-deutschland/mobile-ui/src/components/shared/Centered';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { styled } from '../../../styles';
import { MenuButton } from '../../../components/MenuButton';
import SvgBellFilledHeader from '@democracy-deutschland/mobile-ui/src/components/Icons/BellFilledHeader';
import SvgBellHeader from '@democracy-deutschland/mobile-ui/src/components/Icons/BellHeader';
import {
  ToggleNotification,
  ToggleNotificationVariables,
} from './graphql/muatation/__generated__/ToggleNotification';
import { TOGGLE_NOTIFICATION } from './graphql/muatation/toggleNotification';
import { NotificationsContext } from '../../../context/NotificationPermission';
import { RootStackParamList } from '../../../routes';
import { CountryMap } from './components/CountryMap';

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

type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: ProcedureScreenRouteProp;
  navigation: ScreenNavigationProp;
};

const ShareComponent = Platform.OS === 'ios' ? ShareIconIosHeader : ShareIcon;

export const Procedure: FC<Props> = ({ route, navigation }) => {
  const { notificationSettings, hasPermissions } = useContext(
    NotificationsContext,
  );
  const { isVerified } = useContext(InitialStateContext);
  const { constituency } = useContext(ConstituencyContext);
  const constituencies = constituency ? [constituency] : [];
  const { data, loading, error, refetch } = useQuery<
    ProcedureQueryObj,
    ProcedureVariables
  >(PROCEDURE, {
    variables: {
      id: route.params.procedureId,
      constituencies,
    },
  });

  const share = ({
    type,
    procedureId,
    title,
  }: Pick<Procedure_procedure, 'type' | 'procedureId' | 'title'>) => {
    const url = `${getShareLink()}/${type.toLowerCase()}/${procedureId}/${speakingurl(
      title,
    )}`;
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

  const [toggleNotification] = useMutation<
    ToggleNotification,
    ToggleNotificationVariables
  >(TOGGLE_NOTIFICATION, {
    variables: {
      procedureId: route.params.procedureId,
    },
    refetchQueries: [
      {
        query: PROCEDURE,
        variables: {
          id: route.params.procedureId,
        },
      },
    ],
  });

  const clickBell = useCallback(() => {
    if (
      !notificationSettings.enabled ||
      !notificationSettings.outcomePushs ||
      !hasPermissions
    ) {
      navigation.navigate('NotificationInstruction', {
        done: toggleNotification,
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
            const procedureData = proxy.readQuery<
              ProcedureQueryObj,
              ProcedureVariables
            >({
              query: PROCEDURE,
              variables: {
                id: route.params.procedureId,
                constituencies,
              },
            });
            if (
              procedureData &&
              mutationData &&
              mutationData.toggleNotification
            ) {
              proxy.writeQuery({
                query: PROCEDURE,
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
          onPress={() =>
            refetch({
              id: route.params.procedureId,
              constituencies,
            })
          }
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
      <Intro {...data.procedure} />
      <DetailsContainer>
        <Details
          subjectGroups={subjectGroups}
          submissionDate={submissionDate}
          dateVote={voteDate}
          abstract={abstract}
          procedureId={procedureId}
          currentStatus={currentStatus}
          type={type}
        />
      </DetailsContainer>
      <Folding title="Dokumente">
        <Documents documents={importantDocuments} />
      </Folding>
      {currentStatusHistory.length > 0 && (
        <Folding title="Gesetzesstand">
          <History
            history={currentStatusHistory}
            currentStatus={currentStatus}
          />
        </Folding>
      )}

      {communityVotes &&
        ((voteEnd && new Date(voteEnd) < new Date()) || voted) && (
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
          procedureId={procedureId}
          currentStatus={currentStatus}
          voted={voted}
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
