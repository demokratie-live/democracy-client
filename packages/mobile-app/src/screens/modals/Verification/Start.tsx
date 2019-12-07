// TODO move this to mobile-ui library
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import Description from './Components/Description';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { Linking, Alert } from 'react-native';

import DemocracyTextLogo from '@democracy-deutschland/mobile-ui/src/components/Icons/DemocracyTextLogo';
import { Centered } from '@democracy-deutschland/mobile-ui/src/components/shared/Centered';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { VerificationRootStackParamList } from '../../../routes/Verification';
import { VerificationContext } from '../../../context/Verification';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 11,
    paddingVertical: 11,
  },
}))`
  background-color: #fff;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
`;

const TextLink = styled.Text`
  font-size: 15;
  padding-bottom: 8;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

const linking = (url: string) => () => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url).catch(() => null);
    } else {
      Alert.alert(
        'Nicht unterstützt',
        'Diese Operation wird auf Deinem Gerät zurzeit nicht unterstützt!',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
  });
};

export const VerificationStart: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<VerificationRootStackParamList>
  >();
  const { countdown, expireTime } = useContext(VerificationContext);
  const authCodeExpires = expireTime > new Date();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Centered>
        <DemocracyTextLogo width="274" height="48" color="#000" />
      </Centered>
      <Description
        text={
          'Selbst Abstimmen und Ergebnisse vergleichen kannst Du in DEMOCRACY nur mit einer verifizierten Handynummer.\n\nAktiviere die Verifizierung, indem Du in zwei Schritten einen Zugangscode an Deine Handynummer anforderst.'
        }
      />
      <Folding title="Wofür braucht DEMOCRACY meine Handynummer?">
        <Text>
          <Text>
            {`Ergebnisintegrität ist eine der zentralen Anforderungen eines Wahlverfahrens und bedeutet, dass genau die Stimmen gezählt werden, die von wahlberechtigten BürgerInnen abgegeben werden.\n
Da uns von DEMOCRACY Deutschland e.V. allerdings keine Wählerkartei vorliegt, haben wir uns dafür entschieden, das sogenannte Urnenbuchproblem heuristisch zu lösen und Deine deutsche Handynummer als Schlüsselidentifikator zu verwenden. Das Urnenbuchproblem beschäftigt sich mit der Frage, wer bei einer konkreten Wahl/Abstimmung berechtigt ist, seine Stimme abzugeben und führt die Berechtigten in eben diesem.

Auf diese Weise können wir weit belastbare Ergebnisse erzeugen als über eine einfache E-Mail-Verifikation. Es gilt insofern, eine deutsche Handynummer – eine Stimme. 

Mehr Informationen zu diesem Verfahren kannst du `}
          </Text>
          <TextLink
            onPress={linking(
              'https://github.com/demokratie-live/democracy-docu/wiki/Stimmanonymit%C3%A4t',
            )}>
            hier
          </TextLink>
          <Text> einsehen.</Text>
        </Text>
      </Folding>
      <Folding title="Was passiert mit meiner Nummer nach der Verifikation?">
        <Text>
          <Text>
            {`DEMOCRACY Deutschland e.V. übermittelt Dir nach der Eingabe und Bestätigung Deiner Handynummer einen Verfizierungscode per SMS. Dafür übergibt der Verein Deine Handynummer einmalig im Klartext an den deutschen SMS-Service-Provider SMSFlatrate (smsflatrate.net, Kloppe Media, Ansbacher Str. 85, 91541 Rothenburg). Der Verein speichert Deine Handynummer daraufhin lediglich einwegverschlüsselt in seiner Datenbank; eine weitere Verwendung dieser ist insofern ausgeschlossen.\n

Mehr Informationen zum verwendeten Verfahren kannst Du in unseren `}
          </Text>
          <TextLink
            onPress={linking(
              'https://www.democracy-deutschland.de/#!nutzungsbedingungen',
            )}>
            Nutzungsbedingungen
          </TextLink>
          <Text>
            {` einsehen.

Zu unserer `}
          </Text>
          <TextLink
            onPress={linking(
              'https://www.democracy-deutschland.de/#!datenschutz',
            )}>
            Datenschutzbestimmung
          </TextLink>
          <Text> gelangst Du ferner hier.</Text>
        </Text>
      </Folding>
      {authCodeExpires && (
        <Button
          onPress={() => navigation.push('SmsCodeInput')}
          text="CODE EINGEBEN"
          textColor="white"
          backgroundColor="blue"
        />
      )}

      <Button
        onPress={() => navigation.push('PhoneNumberInput')}
        text={`${
          authCodeExpires
            ? `Neuen Code senden${countdown ? ` (${countdown})` : ''}`
            : 'VERIFIZIEREN'
        } `}
        disabled={countdown > 0}
        textColor="white"
        backgroundColor={authCodeExpires ? 'lightBlue' : 'blue'}
      />
    </ScrollView>
  );
};
