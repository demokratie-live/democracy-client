import React, { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
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
  GetDeputy_deputy_procedures,
} from './graphql/query/__generated__/GetDeputy';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { styled, theme } from '../../styles';
import { Avatar } from '@democracy-deutschland/ui';
import {
  AbgeordneteNavigationProps,
  AbgeordneteRootStackParamList,
} from '../../routes/Sidebar/Abgeordnete';
import { LocalVotesContext } from '../../context/LocalVotes';
import { MatchesBar } from './components/MatchBar';

const Wrapper = styled.View`
  background-color: ${theme.oldColors.background.main};
  flex-grow: 1;
`;

const ScrollWrapper = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 18,
  },
})`
  flex-grow: 1;
  background-color: #fff;
`;

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
  color: ${({ theme }) => theme.textColors.secondary};
`;

const SegmentWrapper = styled.View`
  width: 100%;
  padding-top: 18px;
`;

export interface Contacts {
  name: string;
  URL: string;
  username?: string;
}

type DeputyScreenRouteProp = RouteProp<
  AbgeordneteRootStackParamList,
  'DeputyProfile'
>;

type Props = {
  route: DeputyScreenRouteProp;
};

export const DeputyProfil: React.FC<Props> = ({ route }) => {
  const { localVotes } = useContext(LocalVotesContext);
  const navigation = useNavigation<AbgeordneteNavigationProps>();
  const { data, loading } = useQuery<GetDeputy, GetDeputyVariables>(
    GET_DEPUTY,
    {
      variables: {
        id: route.params.id,
        votedProcedureIds: localVotes.map(({ procedureId }) => procedureId),
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

  if (loading || !data?.deputy) {
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
  } = data.deputy;

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

  return (
    <Wrapper>
      <ScrollWrapper>
        <>
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
            <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
          ) : null}
          <TextGrey>{job}</TextGrey>
          <Chart
            totalProcedures={totalProcedures || 0}
            votedProceduresCount={votedProceduresCount}
          />
          <ChartLegend data={getVotingData(procedureCountByDecision)} />
          <MatchesBar decisions={data.deputy.matchesBar} />
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
      </ScrollWrapper>
    </Wrapper>
  );
};
