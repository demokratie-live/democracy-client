import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParlamentIdentifier } from "../parlament";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "FAVORIZED_DEPUTIES";

// New Zustand store implementation
interface FavorizedDeputiesStore {
  deputies: Record<ParlamentIdentifier, string[]>;
  getDeputies: (parlamentId: ParlamentIdentifier) => string[];
  setDeputies: (parlamentId: ParlamentIdentifier, deputies: string[]) => void;
  addDeputy: (parlamentId: ParlamentIdentifier, deputyId: string) => void;
  removeDeputy: (parlamentId: ParlamentIdentifier, deputyId: string) => void;
  recoilMigrationCompleted: boolean;
  setRecoilMigrationCompleted: (value: boolean) => void;
}

// Initialize with default values for known parlaments
const getDefaultDeputies = () => {
  const defaults: Record<ParlamentIdentifier, string[]> = {
    "BT-19": ["519324", "523750", "518092", "521640", "524466", "518176"],
    "BT-20": [],
    "BT-21": ["1046080", "1047228", "1048026", "1044672", "1046720"],
  };

  return defaults;
};

export const useFavorizedDeputiesStore = create<FavorizedDeputiesStore>()(
  persist(
    (set, get) => ({
      deputies: getDefaultDeputies(),

      getDeputies: (parlamentId) => {
        return get().deputies[parlamentId] || [];
      },

      setDeputies: (parlamentId, deputies) => {
        set((state) => ({
          deputies: {
            ...state.deputies,
            [parlamentId]: deputies,
          },
        }));
      },

      addDeputy: (parlamentId, deputyId) => {
        set((state) => {
          const currentDeputies = state.deputies[parlamentId] || [];
          if (currentDeputies.includes(deputyId)) {
            return state; // No change needed if already exists
          }
          return {
            deputies: {
              ...state.deputies,
              [parlamentId]: [...currentDeputies, deputyId],
            },
          };
        });
      },

      removeDeputy: (parlamentId, deputyId) => {
        set((state) => {
          const currentDeputies = state.deputies[parlamentId] || [];
          return {
            deputies: {
              ...state.deputies,
              [parlamentId]: currentDeputies.filter((id) => id !== deputyId),
            },
          };
        });
      },
      recoilMigrationCompleted: false,
      setRecoilMigrationCompleted: (value) => {
        set(() => ({
          recoilMigrationCompleted: value,
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      // Initialize storage with AsyncStorage values
      onRehydrateStorage(state) {
        return async (newState, error) => {
          if (!newState?.recoilMigrationCompleted) {
            const recoilDeputies = await AsyncStorage.getItem(STORAGE_KEY);
            if (!recoilDeputies) {
              state?.setRecoilMigrationCompleted(true);
              return;
            }
            const parsedRecoilDeputies = JSON.parse(recoilDeputies) as string[];
            if (!Array.isArray(parsedRecoilDeputies)) {
              state?.setRecoilMigrationCompleted(true);
              return;
            }
            state.setDeputies("BT-19", parsedRecoilDeputies);
            state.setDeputies("BT-20", parsedRecoilDeputies);
            state?.setRecoilMigrationCompleted(true);
          }
          if (error) {
            console.error("Rehydration error:", error);
          }
        };
      },
    }
  )
);
