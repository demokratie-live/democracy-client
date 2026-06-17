import { useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { View } from "react-native";
import { ListType } from "src/__generated__/graphql";
import { List } from "src/screens/Bundestag";

const Sitzungswoche: FC = () => {
  const params = useLocalSearchParams<{ e2e?: string }>();

  return (
    <View
      style={{ flex: 1 }}
      testID="ConferenceWeekRouteScreen"
      collapsable={false}
    >
      {params.e2e ? (
        <View
          testID={`E2EMarker-${params.e2e}`}
          collapsable={false}
          style={{ width: 1, height: 1 }}
        />
      ) : null}
      <List list={ListType.ConferenceweeksPlanned} />
    </View>
  );
};

export default Sitzungswoche;
