import React, { useState } from 'react';
import { Alert, Share, TextInput } from 'react-native';
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
        <Button variant="primary" onPress={shareVotes}>
          Abstimmungsdaten Abrufen
        </Button>
      ) : null}

      <Button variant="primary" onPress={() => setShowTextField(v => !v)}>
        {!showTextField ? 'Abstimmungsdaten Einfügen' : 'Abbrechen'}
      </Button>
      {showTextField ? (
        <TextInput
          style={{ borderColor: 'black', borderWidth: 1, width: '100%', height: 200 }}
          multiline
          onChangeText={setText}
          placeholder='{"data": "..."}'
        >
          {text}
        </TextInput>
      ) : null}

      {showTextField ? (
        <Button variant="primary" onPress={onSave}>
          Speichern
        </Button>
      ) : null}
    </Container>
  );
};
