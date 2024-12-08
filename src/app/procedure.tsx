import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";

export default function Procedure() {
  const { procedureId } = useLocalSearchParams<{
    procedureId: string;
  }>();

  return <Text>Procedure: {procedureId ?? "N/A"}</Text>;
}
