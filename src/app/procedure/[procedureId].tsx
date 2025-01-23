import { useLocalSearchParams } from "expo-router/build/hooks";
import { FC } from "react";
import { ProcedureScreen } from "../../screens/Procedure";

const Procedure: FC = (props) => {
  const { ...params } = useLocalSearchParams<{
    procedureId: string;
  }>();

  console.log("Procedure route", { props, params });

  return <ProcedureScreen procedureId={params.procedureId} />;
};

export default Procedure;
