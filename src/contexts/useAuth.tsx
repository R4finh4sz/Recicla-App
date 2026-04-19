import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { deleteItemAsync, setItemAsync } from 'expo-secure-store';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TUser } from '@/types/user';
import { LoginForm } from '@/validation/login.validation';

type ContextValues = {
  user: TUser | null;
  login: (form: LoginForm) => Promise<void>;
  logout: (isDelete?: boolean) => Promise<void>;
  acceptTerms: () => void;
  loading: boolean;
};

type Props = {
  isAppReady: boolean;
};

const AuthContext = createContext({} as ContextValues);

export const AuthProvider = ({
  children,
  isAppReady,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const mapUser = (payload: unknown): TUser => {
    const user = (payload || {}) as Record<string, unknown>;

    return {
      id: Number(user.id || 0),
      documentId: String(user.documentId || user.document || ''),
      name: String(
        user.name || user.fullName || user.username || user.email || '',
      ),
    };
  };

  const getLoginPayload = (payload: unknown): Record<string, unknown> => {
    const response = (payload || {}) as Record<string, unknown>;
    const nestedData = response.data;

    if (nestedData && typeof nestedData === 'object') {
      return nestedData as Record<string, unknown>;
    }

    return response;
  };

  const getAccessToken = (payload: unknown): string => {
    const data = (payload || {}) as Record<string, unknown>;
    const token = data.accessToken || data.jwt || data.token;

    return typeof token === 'string' ? token : '';
  };

  const login = async (form: LoginForm) => {
    // const response = await authService.login(form);
    // const payload = getLoginPayload(response);

    // const accessToken = getAccessToken(payload);

    // if (!accessToken) {
    //   throw new Error('Token de acesso não retornado pela API');
    // }

    // await setItemAsync('accessToken', accessToken);

    // if (payload.user) {
    //   setUser(mapUser(payload.user));
    //   return;
    // }

    // const me = await authService.fetchUser();
    // setUser(mapUser(me));

    // --- MOCK LOGIN (Temporário) ---
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: 1,
      documentId: 'mock-doc-id',
      name: 'Usuário Mock',
    });
    await setItemAsync('accessToken', 'mock-token');
  };

  const logout = async (isDelete = true) => {
    try {
      if (isDelete) {
        await deleteItemAsync('accessToken');
      }
    } catch (error) {
      console.error('Erro ao deletar tokens:', error);
    } finally {
      queryClient.clear();
      setUser(null);
      router.replace('/(auth)/login');
    }
  };

  const acceptTerms = () => {
    return;
  };

  useEffect(() => {
    if (isAppReady) {
      setLoading(false);
    }
  }, [isAppReady]);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(main)/home');
    }
  }, [user, loading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        acceptTerms,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
