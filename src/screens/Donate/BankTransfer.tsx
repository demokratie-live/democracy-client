import React from "react";
import styled from "styled-components/native";
import type { DonationConfig } from "../../api/donations/types";
import { linking } from "../../lib/linking";
import {
  donate2Head,
  donate3Link2,
  donate3Text1,
  donate3Text2,
  donate3Text3,
  donate3Text4,
  donate3Text5,
  donate3Text6,
  donate3Text7,
  donateList1Head,
  donateList2Head,
  donateList3Head,
} from "./content";

/**
 * Bankverbindung für Überweisung und Dauerauftrag – auf beiden Plattformen sichtbar (FR-012) und
 * Fallback, wenn In-App-Zahlungen deaktiviert oder nicht erreichbar sind (FR-013).
 * Werte aus `GET /donations/v1/config`, ersatzweise aus dem App-Bundle.
 */

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

interface Props {
  config: DonationConfig;
}

export const BankTransfer: React.FC<Props> = ({ config }) => (
  <>
    <Headline>{donate2Head}</Headline>
    <DefinitionListWrapper style={{ paddingTop: 18 }}>
      <DefinitionListTitle>{donateList1Head}</DefinitionListTitle>
      <DefinitionListDescription selectable>{config.bankTransfer.holder}</DefinitionListDescription>
    </DefinitionListWrapper>
    <DefinitionListWrapper>
      <DefinitionListTitle>{donateList2Head}</DefinitionListTitle>
      <DefinitionListDescription selectable testID="donate-iban">
        {config.bankTransfer.iban}
      </DefinitionListDescription>
    </DefinitionListWrapper>
    <DefinitionListWrapper style={{ paddingBottom: 18 }}>
      <DefinitionListTitle>{donateList3Head}</DefinitionListTitle>
      <DefinitionListDescription selectable>{config.bankTransfer.bic}</DefinitionListDescription>
    </DefinitionListWrapper>
    <Text>
      <Text>{donate3Text1}</Text>
      <TextLink onPress={linking(config.legal.nonprofitProofUrl)}>{donate3Text2}</TextLink>
      <Text>{donate3Text3}</Text>
      <TextLink onPress={linking(donate3Link2)}>{donate3Text4}</TextLink>
      <Text>{donate3Text5}</Text>
      <TextLink onPress={linking(config.legal.simplifiedReceiptUrl)}>{donate3Text6}</TextLink>
      <Text>{donate3Text7}</Text>
    </Text>
  </>
);
