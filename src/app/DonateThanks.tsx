import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThankYou } from "src/screens/Donate/ThankYou";

const DonateThanks: FC = () => {
  const params = useLocalSearchParams<{ status?: string; interval?: string; amount?: string; mail?: string }>();
  return (
    <ThankYou
      status={params.status === "processing" ? "processing" : "succeeded"}
      interval={params.interval === "monthly" ? "monthly" : "one_time"}
      chargedAmountCents={Number(params.amount) || 0}
      confirmationMailed={params.mail === "1"}
    />
  );
};

export default DonateThanks;
