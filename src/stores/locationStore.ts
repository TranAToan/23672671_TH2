import { create } from 'zustand';

export type LocationStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'blocked' | 'error';

type LocationState = {
  status: LocationStatus;
  latitude: number | null;
  longitude: number | null;
  errorMessage: string | null;
  setLocation: (latitude: number, longitude: number) => void;
  setStatus: (status: LocationStatus, errorMessage?: string | null) => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  status: 'idle', latitude: null, longitude: null, errorMessage: null,
  setLocation: (latitude, longitude) => set({ status: 'granted', latitude, longitude, errorMessage: null }),
  setStatus: (status, errorMessage = null) => set({ status, errorMessage }),
}));
