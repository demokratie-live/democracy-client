import { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThankYou } from "src/screens/Donate/ThankYou";

const DonateThanks: FC = () => {
  const params = useLocalSearchParams<{
    status?: string;
    interval?: string;
    amount?: string;
    mail?: string;
    next?: string;
  }>();
  const nextCharge = params.next ? new Date(params.next) : null;
  return (
    <ThankYou
      status={params.status === "processing" ? "processing" : "succeeded"}
      interval={params.interval === "monthly" ? "monthly" : "one_time"}
      chargedAmountCents={Number(params.amount) || 0}
      confirmationMailed={params.mail === "1"}
      nextChargeAt={nextCharge && !Number.isNaN(nextCharge.getTime()) ? nextCharge : null}
    />
  );
};

export default DonateThanks;
