import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';

// Components
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import { EntryHeader } from './EntryHeader';
import { BankTransfer } from './BankTransfer';
import { DonationForm, type CompletedDonation } from './DonationForm';
import { StripeDonationProvider } from './StripeDonationProvider';
import { MonthlyCard } from './MonthlyCard';

import { donate1Head, donate1Text, donateHintMonthly } from './content';
import { DonationDatum, DonationStatus, DONATION_STATUS } from './graphql/query/donationStatus';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { MadeWithLove } from '../../components/MadeWithLove';
import Folding from '../../components/Folding';
import { useDonationConfig } from '../../api/donations/useDonationConfig';
import { blocksNewMonthly, isOngoing, useMonthlyDonation } from '../../api/donations/useMonthlyDonation';

const ScrollWrapper = styled.ScrollView`
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

const FormCard = styled.View`
  margin-top: 18px;
  margin-horizontal: 18px;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e3e3e3;
  background-color: #fff;
`;

const MadeWithHeartWrapper = styled.View``;

export const DonateScreen: React.FC = () => {
  const { data } = useQuery<{ donationStatus: DonationStatus } | undefined>(DONATION_STATUS);
  const [donationStatus, setDonationStatus] = useState<DonationStatus>();
  const { config, reload: reloadConfig } = useDonationConfig();
  const { status: monthlyStatus } = useMonthlyDonation();
  const ongoingMonthly = isOngoing(monthlyStatus) ? monthlyStatus : null;

  useEffect(() => {
    if (!donationStatus?.result && data) {
      setDonationStatus(data.donationStatus);
    }
  }, [data, donationStatus]);

  // FR-013: Ohne aktive Konfiguration (Kill-Switch, Server nicht erreichbar) nur Finanzierungsstand + Bankverbindung.
  const publishableKey = config.enabled ? config.publishableKey : null;

  const showThanks = (donation: CompletedDonation) => {
    router.replace({
      pathname: '/DonateThanks',
      params: {
        status: donation.status,
        interval: donation.interval,
        amount: String(donation.chargedAmountCents),
        mail: donation.emailProvided ? '1' : '0',
        next: donation.nextChargeAt ?? '',
      },
    });
  };

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

  return (
    <>
      <ScrollWrapper keyboardShouldPersistTaps="handled" testID="donate-screen">
        {donationStatus && donationStatus.result && (
          <View>
            <Wrapper>
              <Headline>{donate1Head}</Headline>
              <Text>{donate1Text}</Text>
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
        {ongoingMonthly && <MonthlyCard status={ongoingMonthly} />}
        {publishableKey && (
          <StripeDonationProvider publishableKey={publishableKey}>
            <FormCard>
              <DonationForm config={config} onCompleted={showThanks} monthlyBlocked={blocksNewMonthly(monthlyStatus)}
                onConfigStale={reloadConfig} />
            </FormCard>
          </StripeDonationProvider>
        )}
        <Wrapper style={{ paddingBottom: 18 }}>
          <BankTransfer config={config} />
        </Wrapper>
      </ScrollWrapper>
      <MadeWithHeartWrapper>
        <MadeWithLove />
      </MadeWithHeartWrapper>
    </>
  );
};
