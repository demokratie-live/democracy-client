import { create } from 'zustand';

interface PushNotificationState {
  token?: string;
  setToken: (token?: string) => void;
  authorized: boolean;
  setAuthorized: (authorized: boolean) => void;
  alreadyDenied: boolean;
  setAlreadyDenied: (alreadyDenied: boolean) => void;
  sent: boolean;
  setSent: (sent: boolean) => void;
}

export const usePushNotificatoinStore = create<PushNotificationState>()(set => ({
  token: undefined,
  setToken: (token?: string) => set({ token }),
  authorized: false,
  setAuthorized: (authorized: boolean) => set({ authorized }),
  alreadyDenied: false,
  setAlreadyDenied: (alreadyDenied: boolean) => set({ alreadyDenied }),
  sent: false,
  setSent: (sent: boolean) => set({ sent }),
}));
