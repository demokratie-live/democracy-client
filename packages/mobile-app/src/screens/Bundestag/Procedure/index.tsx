import React, { useContext, FC, useEffect } from 'react';
import { Text, Platform, Share } from 'react-native';
import { RouteProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';

import ShareIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Share';
import ShareIconIosHeader from '@democracy-deutschland/mobile-ui/src/components/Icons/ShareIosHeader';

import { useQuery, useMutation } from '@apollo/react-hooks';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { ListLoading } from '@democracy-deutschland/mobile-ui/src/components/shared/ListLoading';
import speakingurl from 'speakingurl';
import {
  Procedure as ProcedureQueryObj,
  ProcedureVariables,
  Procedure_procedure,
} from './graphql/query/__generated__/Procedure';
import PROCEDURE from './graphql/query/Procedure';
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

const Container = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: #fff;
`;

const HaderRightWrapper = styled.View`
  flex-direction: row;
  padding-right: 11;
`;

const DetailsContainer = styled.View`
  padding-horizontal: 8;
  margin-top: 18;
  padding-top: 11;
  border-top-width: 1;
  border-color: rgba(68, 148, 211, 0.1);
`;

type ProcedureScreenRouteProp = RouteProp<
  BundestagRootStackParamList,
  'Procedure'
>;

type ScreenNavigationProp = StackNavigationProp<
  BundestagRootStackParamList,
  'TabView'
>;

type Props = {
  route: ProcedureScreenRouteProp;
  navigation: ScreenNavigationProp;
};

const ShareComponent = Platform.OS === 'ios' ? ShareIconIosHeader : ShareIcon;

export const Procedure: FC<Props> = ({ route, navigation }) => {
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

  // TODO Actions oben rechts hinzufügen
  useEffect(() => {
    if (data) {
      const { notify, type, procedureId, title } = data.procedure;
      const BellIcon = !notify ? SvgBellHeader : SvgBellFilledHeader;
      navigation.setOptions({
        headerRight: () => (
          <HaderRightWrapper>
            <MenuButton onPress={() => toggleNotification()}>
              <BellIcon width={20} height={20} color="#fff" />
            </MenuButton>
            <MenuButton onPress={() => share({ type, procedureId, title })}>
              <ShareComponent width={20} height={20} color="#fff" />
            </MenuButton>
          </HaderRightWrapper>
        ),
      });
    }
  }, [navigation, data, toggleNotification]);

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
    <Container>
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
          <CommunityVoteResults voteResults={communityVotes} />
        )}
      {voteResults && (
        <GovernmentVoteResults
          key="government"
          voteResults={voteResults}
          procedureId={procedureId}
          currentStatus={currentStatus}
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
      />
    </Container>
  );
};
