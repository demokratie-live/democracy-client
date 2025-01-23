import { FC } from "react";
import { SmsCodeInputScreen } from "../../screens/Verification/Code";

const SmsCodeInputRoute: FC = (props) => {
  console.log("SmsCodeInputScreen", props);
  return <SmsCodeInputScreen />;
};

export default SmsCodeInputRoute;
