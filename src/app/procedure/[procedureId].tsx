import { useLocalSearchParams } from "expo-router/build/hooks";
import { FC } from "react";
import { View } from "react-native";
import { ProcedureScreen } from "../../screens/Procedure";

const Procedure: FC = (props) => {
  const { ...params } = useLocalSearchParams<{
    procedureId: string;
    e2e?: string;
  }>();

  return (
    <View
      style={{ flex: 1 }}
      testID="ProcedureRouteScreen"
      collapsable={false}
    >
      {params.e2e ? (
        <View
          testID={`E2EMarker-${params.e2e}`}
          collapsable={false}
          style={{ width: 1, height: 1 }}
        />
      ) : null}
      <ProcedureScreen procedureId={params.procedureId} />
    </View>
  );
};

export default Procedure;
