import React, { useState } from 'react';
import { Alert, Share } from 'react-native';
import styled from 'styled-components/native';
import VotesLocal, { ChainEntryRaw, ChainEntryRawZodArray } from '../../lib/VotesLocal';
import { Button as UiButton } from '@democracy-deutschland/ui';
import { useSetRecoilState } from 'recoil';
import { votesLocalState } from '../../api/state/votesLocal';

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
})``;

const Headline = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 18px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 16px;
  margin-bottom: 18px;
`;

const Intro = styled(Text)`
  text-align: center;
`;

const Button = styled(UiButton)`
  margin-bottom: 18px;
`;

export interface SyncObj {
  procedures: ChainEntryRaw[];
  meta: {
    sum: number;
    current: number;
    identifier: string;
    v: number;
  };
}

const VoteTextArea = styled.TextInput`
  width: 100%;
  height: 200px;
  border-color: black;
  border-width: 1px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const SyncVotesScreen = () => {
  const [showTextField, setShowTextField] = useState<boolean>(false);
  const [text, setText] = useState('');
  const setVotesLocal = useSetRecoilState(votesLocalState);
  const shareVotes = () => {
    VotesLocal.readKeychain().then(data => Share.share({ message: JSON.stringify(data.d) }));
  };

  const onSave = () => {
    try {
      const data = JSON.parse(text) as ChainEntryRaw[];

      if (ChainEntryRawZodArray.parse(data)) {
        VotesLocal.mergeKeychains({ v: 1, d: data }).then(setVotesLocal);
        setShowTextField(false);
        Alert.alert('Abstimmungsergebnisse erfolgreich gespeichert');
      }
    } catch (e) {
      Alert.alert('Daten nicht valide. Bitte wiederhole den Vorgang.');
      console.log('Validation Error: ', e);
    }
    setText('');
  };

  return (
    <Container>
      {!showTextField ? (
        <>
          <Intro>So überträgst Du Deine lokalen Stimmen auf ein andres Gerät:</Intro>
          <Headline>AUF DEINEM BISHERIGEN GERÄT</Headline>
          <Text>
            {
              '1. Tippe auf den Button "STIMMEN KOPIEREN" und exportiere Deine lokalen Stimmen in Textform'
            }
          </Text>
          <Text>
            2. Wähle eine der angebotenen Möglichkeiten, z.B. durch Mail an Dich selbst, Deine
            Abstimmungsdaten zu sichern
          </Text>
          <Button variant="primary" onPress={shareVotes}>
            Stimmen kopieren
          </Button>

          <Headline>AUF DEINEM NEUEN GERÄT</Headline>
          <Text>1. Kopiere den gesicherten Text in die Zwischenablage Deines neuen Geräts</Text>
          <Text>2. Öffne DEMOCRACY auf Deinem neuen Gerät</Text>
          <Text>
            {'3. Tippe auf Menu > Einstellungen > Stimmen übertragen und wähle "STIMMEN EINFÜGEN"'}
          </Text>
          <Text>
            {'4. Füge den gesamten Text {"283063":… in das Dialogfeld ein und wähle "SPEICHERN"'}
          </Text>
        </>
      ) : null}

      {showTextField ? (
        <>
          <Headline>Stimmen Einfügen</Headline>
          <Text>
            {'Füge den gesamten Text {{"283063":…} in das Dialogfeld ein und wähle "SPEICHERN"'}
          </Text>
          <VoteTextArea
            style={{ borderColor: 'black', borderWidth: 1, width: '100%', height: 200 }}
            multiline
            onChangeText={setText}
            placeholder='{"data": "..."}'
            placeholderTextColor="grey"
          >
            {text}
          </VoteTextArea>
          <Button variant="primary" onPress={onSave}>
            Speichern
          </Button>
          <Button variant="danger-secondary" onPress={() => setShowTextField(v => !v)}>
            Abbrechen
          </Button>
        </>
      ) : (
        <Button variant="primary" onPress={() => setShowTextField(v => !v)}>
          Stimmen Einfügen
        </Button>
      )}
    </Container>
  );
};
