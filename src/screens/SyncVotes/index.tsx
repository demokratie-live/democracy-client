import React, { useState } from 'react';
import { Alert, Share } from 'react-native';
import styled from 'styled-components/native';
import VotesLocal, { ChainEntryRaw, ChainEntryRawZodArray } from '../../lib/VotesLocal';
import { Button } from '@democracy-deutschland/ui';
import { useSetRecoilState } from 'recoil';
import { votesLocalState } from '../../api/state/votesLocal';

const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
})``;

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

const Text = styled.Text``;

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
      <Text>So überträgst Du Deine lokalen Stimmen auf ein andres Gerät:</Text>
      <Text>------- AUF DEINEM BISHERIGEN GERÄT -------</Text>
      <Text>
        {
          '1. Tippe auf den Button "STIMMEN KOPIEREN" und exportiere Deine lokalen Stimmen in Textform'
        }
      </Text>
      <Text>
        2. Wähle eine der angebotenen Möglichkeiten, z.B. durch Mail an Dich selbst, Deine
        Abstimmungsdaten zu sichern
      </Text>
      {!showTextField ? (
        <Button variant="primary" onPress={shareVotes}>
          Stimmen kopieren
        </Button>
      ) : null}

      <Text>------- AUF DEINEM ANDEREN GERÄT -------</Text>
      <Text>
        1. Kopiere den auf Deinem alten Gerät gesicherten Text in die Zwischenablage Deines neuen
        Geräts
      </Text>
      <Text>2. Öffne DEMOCRACY auf Deinem neuen Gerät</Text>
      <Text>
        {
          '3. Tippe auf Menu > Einstellungen > Stimmen übertragen und wähle "ABSTIMMUNGSDATEN EINFÜGEN"'
        }
      </Text>
      <Text>
        {'4. Füge den gesamten Text {"283063":… in das Dialogfeld ein und wähle "SPEICHERN"'}
      </Text>

      {showTextField ? (
        <>
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
