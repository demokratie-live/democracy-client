import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_LOGGING_ENABLED = 'local_logging_enabled';

interface LoggingState {
  isEnabled: boolean;
  isLoading: boolean;
  setEnabled: (enabled: boolean) => Promise<void>;
  loadInitialState: () => Promise<void>;
}

export const useLoggingStore = create<LoggingState>()((set, get) => ({
  isEnabled: false,
  isLoading: false,

  setEnabled: async (enabled: boolean) => {
    set({ isLoading: true });
    try {
      await AsyncStorage.setItem(STORAGE_KEY_LOGGING_ENABLED, enabled.toString());
      set({ isEnabled: enabled });
    } catch (error) {
      console.error('Failed to save logging enabled state:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadInitialState: async () => {
    set({ isLoading: true });
    try {
      const enabled = await AsyncStorage.getItem(STORAGE_KEY_LOGGING_ENABLED);
      set({ isEnabled: enabled === 'true' });
    } catch (error) {
      console.error('Failed to load logging enabled state:', error);
      set({ isEnabled: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));