import { Text, View } from "react-native";
import * as Application from "expo-application";
import { useGetAllStorageKeys } from "../../hooks/asyncStorage/getAllStorageKeys";
import { useLocalVotes } from "../../hooks/getLoaclVotes";

export default function LocalData() {
  const { allStoragesWithValues } = useGetAllStorageKeys();
  const { localVotes } = useLocalVotes();

  console.log("Application.applicationId", Application.applicationId);
  console.log("allStoragesWithValues", allStoragesWithValues);
  console.log("localVotes", localVotes);

  return (
    <View>
      <Text>Application.applicationId: {Application.applicationId}</Text>
      <Text>
        allStoragesWithValues: {JSON.stringify(allStoragesWithValues)}
      </Text>
      <Text>localVotes: {JSON.stringify(localVotes)}</Text>
    </View>
  );
}
