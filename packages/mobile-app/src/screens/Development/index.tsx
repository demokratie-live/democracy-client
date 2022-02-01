import React, { useContext } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { LocalVotesContext } from '../../context/LocalVotes';

export const DevScreen = () => {
  const { deleteAllLocalVotes, updateLocalVotesStore } = useContext(
    LocalVotesContext,
  );

  const deleteVotes = () => {
    return deleteAllLocalVotes().then(updateLocalVotesStore);
  };
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() =>
          deleteVotes().then(() => Alert.alert('Local votes deleted'))
        }>
        <Text>Delete local votes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
