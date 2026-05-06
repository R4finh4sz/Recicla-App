import { TLoginTwoFactorResponse, TVerifyCodeResponse } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

import { http } from '../http';

export type RegisterMunicipeForm = {
  nome: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  numero: string;
  complemento?: string;
  cep: string;
  cidade: string;
  estado: string;
  telefone: string;
  imagemUrl?: string;
};

export type TActiveTermsResponse = {
  data: {
    id: number;
    documentId: string;
    version: string;
    title: string;
    content: string;
    contentHash: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  };
};

export const authService = {
  login: async (form: LoginForm) => {
    const { data } = await http.post<TLoginTwoFactorResponse>(
      `/auth/local`,
      form,
    );
    return data;
  },

  verifyCode: async (payload: {
    email: string;
    code: string;
    challengeId: string;
  }) => {
    const { data } = await http.post<TVerifyCodeResponse>(
      `/auth/local/verify-code`,
      payload,
    );
    return data;
  },

  resendCode: async (payload: { email: string; challengeId: string }) => {
    const { data } = await http.post<TLoginTwoFactorResponse>(
      `/auth/local/resend-code`,
      payload,
    );
    return data;
  },

  registerMunicipe: async (form: RegisterMunicipeForm) => {
    const { data } = await http.post(`/register/municipes`, form);
    return data;
  },

  fetchActiveTerms: async () => {
    const { data } = await http.get<TActiveTermsResponse>(
      `/autoregister/termos/active`,
    );
    return data;
  },

  acceptTermsPublic: async () => {
    const { data } = await http.patch(`/auth/onboarding/accept-terms/public`);
    return data;
  },

  refreshAccessToken: async (refreshToken: string) => {
    const { data } = await http.post<{ accessToken: string }>(
      `/api/auth/refresh-token`,
      {
        refreshToken,
      },
    );
    return data;
  },

  fetchUser: async () => {
    const { data } = await http.get(`/api/auth/me`);
    return data;
  },

  requestPasswordReset: async (email: string) => {
    const { data } = await http.post(`/auth/request-password-reset`, { email });
    return data;
  },

  validateResetCode: async (payload: { email: string; code: string }) => {
    const { data } = await http.post<{ resetToken: string }>(
      `/auth/password-reset/validate-code`,
      payload,
    );
    return data;
  },

  resetPassword: async (payload: {
    resetToken: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const { data } = await http.post(`/auth/reset-password`, payload);
    return data;
  },
};
