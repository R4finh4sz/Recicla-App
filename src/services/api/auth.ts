import { TLoginResponse } from '@/types/user';
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
    // const { data } = await http.post<TLoginResponse>(
    //   `/api/auth/municipe/login`,
    //   form,
    // );
    // return data;

    // --- MOCK ---
    return {
      accessToken: 'mock-token',
      user: {
        id: 1,
        documentId: 'mock-doc-id',
        name: 'Usuário Mock',
      },
    } as any;
  },

  registerMunicipe: async (form: RegisterMunicipeForm) => {
    // const { data } = await http.post(`/register/municipes`, form);
    // console.warn('[AUTH] POST /register/municipes payload:', {
    //   ...form,
    // });
    // return data;

    // --- MOCK ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: 'success' };
  },

  fetchActiveTerms: async () => {
    const { data } = await http.get<TActiveTermsResponse>(
      `/autoregister/termos/active`,
    );
    return data;
  },

  acceptTermsPublic: async () => {
    // const { data } = await http.patch(`/auth/onboarding/accept-terms/public`);
    // return data;

    // --- MOCK ---
    return { status: 'success' };
  },

  refreshAccessToken: async (refreshToken: string) => {
    const { data } = await http.post<TLoginResponse>(
      `/api/auth/refresh-token`,
      {
        refreshToken,
      },
    );
    return data;
  },

  fetchUser: async () => {
    // const { data } = await http.get<TUser>(`/api/auth/me`);
    // return data;

    // --- MOCK ---
    return {
      id: 1,
      documentId: 'mock-doc-id',
      name: 'Usuário Mock',
    } as any;
  },
};
