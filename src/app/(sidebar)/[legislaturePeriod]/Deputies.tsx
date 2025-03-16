import { useLegislaturePeriodStore } from "src/api/state/legislaturePeriod";
import { ParlamentIdentifier } from "src/api/state/parlament";
import { AbgeordneteScreen } from "src/screens/Abgeordnete";

export default function Deputies() {
  const { legislaturePeriod } = useLegislaturePeriodStore();
  return (
    <AbgeordneteScreen
      key={legislaturePeriod}
      parlamentIdentifier={`BT-${legislaturePeriod}` as ParlamentIdentifier}
    />
  );
}
