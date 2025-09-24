import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_LOGGING_ENABLED = 'local_logging_enabled';
const STORAGE_KEY_REQUEST_LOGGING_ENABLED = 'local_request_logging_enabled';

interface LoggingState {
  isEnabled: boolean;
  isRequestLoggingEnabled: boolean;
  isLoading: boolean;
  setEnabled: (enabled: boolean) => Promise<void>;
  setRequestLoggingEnabled: (enabled: boolean) => Promise<void>;
  loadInitialState: () => Promise<void>;
}

export const useLoggingStore = create<LoggingState>()((set, get) => ({
  isEnabled: false,
  isRequestLoggingEnabled: false,
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

  setRequestLoggingEnabled: async (enabled: boolean) => {
    set({ isLoading: true });
    try {
      await AsyncStorage.setItem(STORAGE_KEY_REQUEST_LOGGING_ENABLED, enabled.toString());
      set({ isRequestLoggingEnabled: enabled });
    } catch (error) {
      console.error('Failed to save request logging enabled state:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  loadInitialState: async () => {
    set({ isLoading: true });
    try {
      const enabled = await AsyncStorage.getItem(STORAGE_KEY_LOGGING_ENABLED);
      const requestLoggingEnabled = await AsyncStorage.getItem(STORAGE_KEY_REQUEST_LOGGING_ENABLED);
      set({ 
        isEnabled: enabled === 'true',
        isRequestLoggingEnabled: requestLoggingEnabled === 'true'
      });
    } catch (error) {
      console.error('Failed to load logging enabled state:', error);
      set({ 
        isEnabled: false,
        isRequestLoggingEnabled: false
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));