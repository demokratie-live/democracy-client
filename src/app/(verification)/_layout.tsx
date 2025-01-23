import { Stack } from "expo-router";
import { VerificationProvider } from "../../api/state/Verification";

export type VerificationStackParamList = {
  VerificationStart: undefined;
  PhoneNumberInput: undefined;
  SmsCodeInput: undefined;
  SmsDonate: undefined;
};

export default function VerificationLayout() {
  return (
    <VerificationProvider>
      <Stack
        initialRouteName="VerificationStart"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="VerificationStart" />
        <Stack.Screen name="PhoneNumberInput" />
        <Stack.Screen name="SmsCodeInput" />
        <Stack.Screen name="SmsDonate" />
      </Stack>
    </VerificationProvider>
  );
}
