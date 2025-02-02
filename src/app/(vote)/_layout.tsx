import { Stack, useGlobalSearchParams } from "expo-router";
import { VerificationProvider } from "../../api/state/Verification";
import { VoteSelection } from "../../__generated__/graphql";

export type VoteStackParamList = {
  Voting: {
    selection: VoteSelection.Yes | VoteSelection.No | VoteSelection.Abstination;
    procedureId: string;
    title: string;
  };
  OutcomePush: {
    title?: string;
    procedureId?: string;
  };
};

export default function VoteLayout() {
  const params = useGlobalSearchParams<VoteStackParamList["Voting"]>();
  console.log("VoteLayout", params);
  return (
    <VerificationProvider>
      <Stack initialRouteName="Voting" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Voting" initialParams={params} />
        <Stack.Screen name="OutcomePush" />
      </Stack>
    </VerificationProvider>
  );
}
