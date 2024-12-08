import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text } from "react-native";

export default function Procedures() {
  const { legislaturePeriod } = useLocalSearchParams<{
    legislaturePeriod: string;
  }>();

  return <Text>Vorgänge für Periode: {legislaturePeriod}</Text>;
}
