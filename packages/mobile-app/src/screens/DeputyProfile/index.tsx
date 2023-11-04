import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import ContactBox from './components/ContactBox';
// Components
import Chart from './Chart';
import ChartLegend from '../Bundestag/Procedure/components/Charts/ChartLegend';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_DEPUTY } from './graphql/query/getDeputy';
import {
  GetDeputy,
  GetDeputyVariables,
  GetDeputy_deputy,
  GetDeputy_deputy_procedures,
} from './graphql/query/__generated__/GetDeputy';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { styled, theme } from '../../styles';
import { Avatar, ProcedureListItem } from '@democracy-deutschland/ui';
import { LocalVotesContext } from '../../context/LocalVotes';
import { MatchesBar } from './components/MatchBar';
import WomHeader from '../WahlOMeter/Header';
import { getMatchingProcedures } from './components/MatchBar/MatchesBar.utils';
import { GET_DEPUTY_PROCEDURES } from './graphql/query/getProcedures';
import {
  GetDeputyProcedures,
  GetDeputyProceduresVariables,
  GetDeputyProcedures_deputy_procedures,
} from './graphql/query/__generated__/GetDeputyProcedures';
import * as S from './Foldable.styled';
import { RootStackParamList } from '../../routes';
import { StackNavigationProp } from '@react-navigation/stack';

const MemberImageWrapper = styled.View`
  width: 100%;
  /* height: 379px; */
  align-items: center;
  padding-bottom: 8px;
  padding-left: 60px;
`;

const Text = styled.Text`
  font-size: 15px;
`;

const TextGrey = styled(Text)`
  color: #6d6d72;
`;

const TextLighGrey = styled(Text)`
  color: ${theme.textColors.secondary};
`;

const SegmentWrapper = styled.View`
  width: 100%;
`;

export interface Contacts {
  name: string;
  URL: string;
  username?: string;
}

type DeputyScreenRouteProp = RouteProp<RootStackParamList, 'DeputyProfile'>;

type Props = {
  route: DeputyScreenRouteProp;
};

export const DeputyProfil: React.FC<Props> = ({ route }) => {
  const [showProcedures, setShowProcedures] = useState(true);
  const { localVotes } = useContext(LocalVotesContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data, previousData } = useQuery<GetDeputy, GetDeputyVariables>(
    GET_DEPUTY,
    {
      variables: {
        id: route.params.id,
        votedProcedureIds: localVotes.map(({ procedureId }) => procedureId),
      },
    },
  );
  const {
    data: proceduresData,
    loading: proceduresLoading,
    fetchMore,
  } = useQuery<GetDeputyProcedures, GetDeputyProceduresVariables>(
    GET_DEPUTY_PROCEDURES,
    {
      variables: {
        id: route.params.id,
        limit: 10,
        offset: 0,
      },
    },
  );

  useEffect(() => {
    if (data?.deputy) {
      navigation.setOptions({ title: data.deputy.name });
    }
  }, [data, navigation]);

  const getActivityIndicator = () => <ActivityIndicator size="large" />;

  const getVotingData = (procedureCountByDecision: {
    YES: number;
    ABSTINATION: number;
    NO: number;
    NOTVOTED: number;
  }) => {
    return [
      {
        label: 'Zustimmungen',
        color: '#99C93E',
        value: procedureCountByDecision.YES,
      },
      {
        label: 'Enthaltungen',
        color: '#4CB0D8',
        value: procedureCountByDecision.ABSTINATION,
      },
      {
        label: 'Ablehnungen',
        color: '#D43194',
        value: procedureCountByDecision.NO,
      },
      {
        label: 'Abwesend',
        color: '#B1B3B4',
        value: procedureCountByDecision.NOTVOTED,
      },
    ];
  };

  const getProcedureCountByDecision = (
    procedures: GetDeputy_deputy_procedures[],
  ) => {
    return procedures.reduce<{
      YES: number;
      ABSTINATION: number;
      NO: number;
      NOTVOTED: number;
    }>(
      (
        prev,
        { decision }: { decision: 'YES' | 'ABSTINATION' | 'NO' | 'NOTVOTED' },
      ) => {
        return { ...prev, [decision]: prev[decision] + 1 };
      },
      {
        YES: 0,
        ABSTINATION: 0,
        NO: 0,
        NOTVOTED: 0,
      },
    );
  };

  const deputyData = (data?.deputy || previousData?.deputy) as GetDeputy_deputy;

  if (!deputyData) {
    console.log('return getActivityIndicator();');
    return getActivityIndicator();
  }

  const {
    imgURL,
    party,
    name,
    job,
    biography,
    contact,
    procedures,
    totalProcedures,
    constituency,
  } = deputyData;

  let contacts: Contacts[] = [];
  if (contact) {
    contacts = contact.email
      ? [
          { name: 'email', URL: contact.email },
          ...contact.links.map(link => ({
            ...link,
            username: link.username ? link.username : undefined,
          })),
        ]
      : [
          ...contact.links.map(link => ({
            ...link,
            username: link.username ? link.username : undefined,
          })),
        ];
  }

  const procedureCountByDecision = getProcedureCountByDecision(procedures);

  const votedProceduresCount =
    procedures.length - procedureCountByDecision.NOTVOTED;

  const votedProcedures = deputyData.matchesBar.map(
    ({ procedure, decision }) => ({
      procedureId: procedure.procedureId,
      decision,
    }),
  );

  const chartData = {
    localVotes,
    votedProcedures,
  };

  const matchingProcedures = getMatchingProcedures(chartData);

  return (
    <FlatList<GetDeputyProcedures_deputy_procedures>
      onEndReached={() =>
        !proceduresLoading &&
        showProcedures &&
        fetchMore({
          variables: { offset: proceduresData?.deputy?.procedures.length },
        })
      }
      ListHeaderComponent={() => (
        <View style={{ alignItems: 'center', paddingTop: 11 }}>
          <WomHeader
            totalProcedures={totalProcedures ?? 0}
            votedProceduresCount={matchingProcedures.length}
          />
          <MemberImageWrapper>
            <Avatar
              partyLogo={{
                party: party as any,
                width: 200,
              }}
              profileImage={{
                height: 280,
                variant: 'oval',
                source: { uri: imgURL },
              }}
            />
          </MemberImageWrapper>
          <Text>{name}</Text>
          {constituency ? (
            <TextLighGrey>Direktkandidat WK {constituency}</TextLighGrey>
          ) : null}
          <TextGrey>{job}</TextGrey>
          <Chart
            totalProcedures={totalProcedures || 0}
            votedProceduresCount={votedProceduresCount}
          />
          <ChartLegend data={getVotingData(procedureCountByDecision)} />
          {deputyData ? <MatchesBar decisions={deputyData.matchesBar} /> : null}
          <S.Wrapper>
            <S.Header onPress={() => setShowProcedures(!showProcedures)}>
              <S.Headline>Abstimmungen</S.Headline>
              <S.CollapseIcon open={showProcedures} />
            </S.Header>
            <S.Divider />
          </S.Wrapper>
        </View>
      )}
      ListFooterComponent={() => (
        <>
          {biography || contact ? (
            <SegmentWrapper>
              {biography ? (
                <Folding title="Biographie">
                  <TextGrey>{biography}</TextGrey>
                </Folding>
              ) : null}
              {contact || contacts.length !== 0 ? (
                <Folding title="Kontakt" opened>
                  {contact ? <TextGrey>{contact.address}</TextGrey> : null}
                  {contacts.length !== 0 && <ContactBox contacts={contacts} />}
                </Folding>
              ) : null}
            </SegmentWrapper>
          ) : null}
        </>
      )}
      data={proceduresData?.deputy?.procedures ?? []}
      keyExtractor={item => item.procedure.procedureId}
      renderItem={({ item }) => {
        if (!showProcedures) {
          return null;
        }
        const localProcedure = localVotes.find(
          ({ procedureId }) => item.procedure.procedureId === procedureId,
        );
        const decision = localProcedure?.selection;
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.push('Procedure', {
                procedureId: item.procedure.procedureId,
                title: item.procedure.type,
              })
            }>
            <ProcedureListItem
              date={new Date()}
              title={item.procedure.title}
              subtitle={item.procedure.subjectGroups.join(', ')}
              voted={item.procedure.voted}
              votes={item.procedure.activityIndex.activityIndex}
              governmentChart={{
                data: [
                  {
                    color:
                      item.decision === 'YES'
                        ? theme.colors.vote.government.yes
                        : item.decision === 'ABSTINATION'
                        ? theme.colors.vote.government.abstination
                        : item.decision === 'NO'
                        ? theme.colors.vote.government.no
                        : theme.colors.vote.government.notVoted,
                    highlight: true,
                    name: item.decision,
                    value: 1,
                  },
                ],
                size: 18,
              }}
              communityChart={
                decision
                  ? {
                      data: [
                        {
                          color:
                            decision === 'YES'
                              ? theme.colors.vote.community.yes
                              : decision === 'ABSTINATION'
                              ? theme.colors.vote.community.abstination
                              : theme.colors.vote.community.no,
                          highlight: true,
                          name: 'yes',
                          value: 1,
                        },
                      ],
                      size: 18,
                    }
                  : undefined
              }
            />
            <S.Divider />
          </TouchableOpacity>
        );
      }}
    />
  );
};
