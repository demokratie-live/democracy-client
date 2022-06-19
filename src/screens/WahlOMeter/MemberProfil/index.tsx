import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ContactBox from './components/ContactBox';
import Chart from './Chart';
import { useNavigation } from '@react-navigation/core';
import { Avatar, ChartLegend } from '@democracy-deutschland/ui';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../../api/state/constituency';
import {
  GetDeputyProfileQuery,
  useGetDeputyProfileQuery,
  VoteSelection,
} from '../../../__generated__/graphql';
import Folding from '../../../components/Folding';
import { PartyProps } from '@democracy-deutschland/ui/dist/Atoms/PartyLogo/old';

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
  color: ${({ theme }) => theme.colors.text.tertiary};
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

export const MemberProfil = () => {
  const navigation = useNavigation();
  const constituency = useRecoilValue(constituencyState);
  const { data, loading } = useGetDeputyProfileQuery({
    variables: {
      constituency: constituency || '',
      directCandidate: true,
    },
  });

  useEffect(() => {
    if (data) {
      navigation.setOptions({ title: data.deputiesOfConstituency[0].name });
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
    procedures: Exclude<
      GetDeputyProfileQuery['deputiesOfConstituency'][0],
      null | undefined
    >['procedures'],
  ) => {
    return procedures.reduce(
      (prev, { decision }) => {
        return { ...prev, [decision]: prev[decision] + 1 };
      },
      {
        YES: 0,
        ABSTINATION: 0,
        NO: 0,
        NOTVOTED: 0,
      } as { [decision in VoteSelection]: number },
    );
  };

  if (loading || !data) {
    return getActivityIndicator();
  }

  const { imgURL, party, name, job, biography, contact, procedures, totalProcedures } =
    data.deputiesOfConstituency[0];

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

  const votedProceduresCount = procedures.length - procedureCountByDecision.NOTVOTED;

  return (
    <ScrollWrapper>
      {constituency && (
        <>
          <MemberImageWrapper>
            <Avatar
              partyLogo={{
                party: party as PartyProps['party'],
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
          <TextLighGrey>Direktkadidat WK {constituency}</TextLighGrey>
          <TextGrey>{job}</TextGrey>
          <Chart
            totalProcedures={totalProcedures || 0}
            votedProceduresCount={votedProceduresCount}
          />
          <ChartLegend data={getVotingData(procedureCountByDecision)} />
          <SegmentWrapper>
            <Folding title="Biographie">
              <TextGrey>{biography}</TextGrey>
            </Folding>
            <Folding title="Kontakt" opened>
              {!!contact && <TextGrey>{contact.address}</TextGrey>}
              {contacts.length !== 0 && <ContactBox contacts={contacts} />}
            </Folding>
          </SegmentWrapper>
        </>
      )}
    </ScrollWrapper>
  );
};
