import React, { useState, useEffect } from 'react';
import { Platform, Linking, View, Image, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Components
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import { EntryHeader } from './EntryHeader';

import {
  donate1Head,
  donate1Text,
  donateHintMonthly,
  donate2Head,
  donate3Link1,
  donate3Link2,
  donate3Link3,
  donate3Text1,
  donate3Text2,
  donate3Text3,
  donate3Text4,
  donate3Text5,
  donate3Text6,
  donate3Text7,
  donateList1Head,
  donateList1Text,
  donateList2Head,
  donateList2Text,
  donateList3Head,
  donateList3Text,
} from './content';
import { DonationDatum, DonationStatus, DONATION_STATUS } from './graphql/query/donationStatus';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { MadeWithLove } from '../../components/MadeWithLove';
import Folding from '../../components/Folding';

const ScrollWrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 18px;
  padding-horizontal: 18px;
`;

const Headline = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.seperator};
  padding-bottom: 6px;
`;

const Text = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.seperator};
`;

const TextLink = styled.Text`
  font-size: 15px;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

const Version = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.seperator};
  padding-top: 28px;
  padding-bottom: 11px;
  text-align: center;
`;

const DefinitionListWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 3px;
`;

const DefinitionListTitle = styled.Text`
  width: 30%;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.seperator};
`;

const DefinitionListDescription = styled.Text`
  width: 70%;
  color: ${({ theme }) => theme.colors.text.seperator};
`;

export const DonateScreen: React.FC = () => {
  const { data } = useQuery<{ donationStatus: DonationStatus } | undefined>(DONATION_STATUS);
  const [donationStatus, setDonationStatus] = useState<DonationStatus>();

  useEffect(() => {
    if (!donationStatus?.result && data) {
      setDonationStatus(data.donationStatus);
    }
  }, [data, donationStatus]);

  const renderEntryHeadline = (entry: DonationDatum) => {
    return <EntryHeader key={entry.id} title={entry.text_description} style={{ marginTop: 18 }} />;
  };

  const renderEntry = (entry: DonationDatum) => (
    <Entry
      key={entry.id}
      target={entry.max}
      occupied={entry.value}
      money={`${entry.max}€`}
      dueDate={entry.text_date}
      description={`${entry.text_description} ${entry.text_cost} ${entry.text_description_subtext}`}
    />
  );

  const renderDonationEntries = (entries: DonationDatum[]) =>
    entries.map(entry => {
      switch (entry.type) {
        case 0:
          return renderEntryHeadline(entry);
        case 1:
          return renderEntry(entry);

        default:
          return null;
      }
    });

  const version = `Version: ${DeviceInfo.getReadableVersion()
    .split('.')
    .slice(0, 3)
    .join('.')} (${DeviceInfo.getBuildNumber()})`;

  return (
    <ScrollWrapper>
      {donationStatus && donationStatus.result && (
        <View>
          <Wrapper>
            <Headline>{donate1Head}</Headline>
            <Text>{donate1Text}</Text>
            {/* <Text style={{ marginBottom: 21 }}>
              Spendenstand vom {donationStatus.result.donation_date}
            </Text> */}
            <DonatedBox
              target={donationStatus.result.donation_value_goal}
              occupied={donationStatus.result.donation_value}
            />
          </Wrapper>
          <Folding title="Details zum Finanzierungsbedarf">
            <Entry
              target={donationStatus.result.donation_value_goal}
              occupied={donationStatus.result.donation_value}
              money={`${donationStatus.result.donation_value}€ von ${donationStatus.result.donation_value_goal}€`}
              description="min. Finanzierungsziel/Monat"
            />
            {renderDonationEntries(donationStatus.result.donation_data)}
          </Folding>
          <Wrapper>
            <Text>{donateHintMonthly}</Text>
          </Wrapper>
        </View>
      )}
      {Platform.OS === 'ios' ? (
        <Wrapper>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL('https://donorbox.org/democracy-app')}
          >
            <Image source={require('./assets/DonateButton.png')} />
          </TouchableOpacity>
          <Version>{version}</Version>
        </Wrapper>
      ) : (
        <Wrapper>
          <Headline>{donate2Head}</Headline>
          <DefinitionListWrapper style={{ paddingTop: 18 }}>
            <DefinitionListTitle>{donateList1Head}</DefinitionListTitle>
            <DefinitionListDescription>{donateList1Text}</DefinitionListDescription>
          </DefinitionListWrapper>
          <DefinitionListWrapper>
            <DefinitionListTitle>{donateList2Head}</DefinitionListTitle>
            <DefinitionListDescription selectable={true}>
              {donateList2Text}
            </DefinitionListDescription>
          </DefinitionListWrapper>
          <DefinitionListWrapper style={{ paddingBottom: 18 }}>
            <DefinitionListTitle>{donateList3Head}</DefinitionListTitle>
            <DefinitionListDescription selectable={true}>
              {donateList3Text}
            </DefinitionListDescription>
          </DefinitionListWrapper>
          <Text>
            <Text>{donate3Text1}</Text>
            <TextLink onPress={() => Linking.openURL(donate3Link1)}>{donate3Text2}</TextLink>
            <Text>{donate3Text3}</Text>
            <TextLink onPress={() => Linking.openURL(donate3Link2)}>{donate3Text4}</TextLink>
            <Text>{donate3Text5}</Text>
            <TextLink onPress={() => Linking.openURL(donate3Link3)}>{donate3Text6}</TextLink>
            <Text>{donate3Text7}</Text>
          </Text>
          <Version>{version}</Version>
        </Wrapper>
      )}
      <MadeWithLove />
    </ScrollWrapper>
  );
};
