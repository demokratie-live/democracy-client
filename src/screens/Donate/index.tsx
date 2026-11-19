import React, { useState, useEffect } from 'react';
import { router } from 'expo-router';

// Components
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import { EntryHeader } from './EntryHeader';
import { BankTransfer } from './BankTransfer';
import { DonationForm, type CompletedDonation } from './DonationForm';
import { StripeDonationProvider } from './StripeDonationProvider';

import { donate1Head, donate1Text, donate2Head, donateHintMonthly } from './content';
import { DonationDatum, DonationStatus, DONATION_STATUS } from './graphql/query/donationStatus';
import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { MadeWithLove } from '../../components/MadeWithLove';
import Folding from '../../components/Folding';
import { useDonationConfig } from '../../api/donations/useDonationConfig';

/**
 * Spenden-Screen (specs/001-in-app-donations), schlank nach Signal-Vorbild:
 * kurze Einleitung mit Spendenstand → Spendenformular → eingeklappt: Finanzierungsdetails und
 * Bankverbindung. Ohne aktive In-App-Zahlung (Kill-Switch, Server nicht erreichbar) ist die
 * Bankverbindung aufgeklappt (FR-012/FR-013).
 */

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Intro = styled.View`
  padding-top: 18px;
  padding-horizontal: 18px;
`;

const Headline = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text.seperator};
  padding-bottom: 6px;
`;

const Text = styled.Text`
  font-size: 15px;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.text.seperator};
`;

const ProgressWrapper = styled.View`
  margin-top: 14px;
`;

const FormWrapper = styled.View`
  padding-horizontal: 18px;
  padding-top: 20px;
  padding-bottom: 8px;
`;

const Hint = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.seperator};
  padding-top: 8px;
`;

const Spacer = styled.View`
  height: 18px;
`;

const MadeWithHeartWrapper = styled.View``;

export const DonateScreen: React.FC = () => {
  const { data } = useQuery<{ donationStatus: DonationStatus } | undefined>(DONATION_STATUS);
  const [donationStatus, setDonationStatus] = useState<DonationStatus>();
  const { config } = useDonationConfig();

  useEffect(() => {
    if (!donationStatus?.result && data) {
      setDonationStatus(data.donationStatus);
    }
  }, [data, donationStatus]);

  // FR-013: Ohne aktive Konfiguration (Kill-Switch, Server nicht erreichbar) nur Finanzierungsstand + Bankverbindung.
  const publishableKey = config.enabled ? config.publishableKey : null;
  // Jeder Tipp auf „Bankverbindung" im Formular klappt die Box (neu) auf – auch nach manuellem Zuklappen.
  const [bankTransferRequests, setBankTransferRequests] = useState(0);
  const showBankTransfer = bankTransferRequests > 0 || !publishableKey;

  const showThanks = (donation: CompletedDonation) => {
    router.replace({
      pathname: '/DonateThanks',
      params: {
        status: donation.status,
        interval: donation.interval,
        amount: String(donation.chargedAmountCents),
        mail: donation.emailProvided ? '1' : '0',
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
        <Intro>
          <Headline>{donate1Head}</Headline>
          <Text>{donate1Text}</Text>
          {donationStatus?.result && (
            <ProgressWrapper>
              <DonatedBox
                target={donationStatus.result.donation_value_goal}
                occupied={donationStatus.result.donation_value}
              />
            </ProgressWrapper>
          )}
        </Intro>

        {publishableKey && (
          <StripeDonationProvider publishableKey={publishableKey}>
            <FormWrapper>
              <DonationForm
                config={config}
                onCompleted={showThanks}
                onShowBankTransfer={() => setBankTransferRequests(count => count + 1)}
              />
            </FormWrapper>
          </StripeDonationProvider>
        )}

        {donationStatus?.result && (
          <Folding title="Details zum Finanzierungsbedarf">
            <Entry
              target={donationStatus.result.donation_value_goal}
              occupied={donationStatus.result.donation_value}
              money={`${donationStatus.result.donation_value}€ von ${donationStatus.result.donation_value_goal}€`}
              description="min. Finanzierungsziel/Monat"
            />
            {renderDonationEntries(donationStatus.result.donation_data)}
            <Hint>{donateHintMonthly}</Hint>
          </Folding>
        )}
        <Folding key={`bank-${bankTransferRequests}`} title={donate2Head} opened={showBankTransfer}>
          <BankTransfer config={config} />
        </Folding>
        <Spacer />
      </ScrollWrapper>
      <MadeWithHeartWrapper>
        <MadeWithLove />
      </MadeWithHeartWrapper>
    </>
  );
};
