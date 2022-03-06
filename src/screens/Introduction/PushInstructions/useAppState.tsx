import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface Settings {
  onChange?: (newAppState: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppState = (settings: Settings = {}) => {
  const { onChange, onForeground, onBackground } = settings;
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'active' && appState !== 'active') {
        onForeground?.();
      } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        onBackground?.();
      }
      setAppState(nextAppState);
      onChange?.(nextAppState);
    }
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => appStateListener.remove();
  }, [onChange, onForeground, onBackground, appState]);

  return { appState };
};
