import { create } from 'zustand';

export type OTPModalState = {
  visible: boolean;
  email: string;
  challengeId: string;
};

type Store = {
  otpModal: OTPModalState | null;
  openOTPModal: (state: OTPModalState) => void;
  closeOTPModal: () => void;
};

export const useOTPModal = create<Store>(set => ({
  otpModal: null,
  openOTPModal: state => set({ otpModal: state }),
  closeOTPModal: () => set({ otpModal: null }),
}));
