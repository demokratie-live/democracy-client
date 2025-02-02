import { currentLegislaturPeriod } from "src/data/legislaturPeriods";
import { create } from "zustand";

interface LegislaturePeriodState {
  legislaturePeriod?: string;
  setLegislaturePeriod: (legislaturePeriod?: string) => void;
}

export const useLegislaturePeriodStore = create<LegislaturePeriodState>()(
  (set) => ({
    legislaturePeriod: currentLegislaturPeriod,
    setLegislaturePeriod: (legislaturePeriod) => set({ legislaturePeriod }),
  })
);
