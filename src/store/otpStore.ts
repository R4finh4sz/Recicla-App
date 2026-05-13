import { create } from 'zustand';

export type OTPState = {
  email: string;
  challengeId: string;
};

type Store = {
  otpData: OTPState | null;
  setOTPData: (data: OTPState) => void;
  clearOTPData: () => void;
};

export const useOTPStore = create<Store>(set => ({
  otpData: null,
  setOTPData: data => set({ otpData: data }),
  clearOTPData: () => set({ otpData: null }),
}));
