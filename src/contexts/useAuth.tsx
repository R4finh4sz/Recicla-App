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

  const login = async (form: LoginForm) => {
    if (form.identifier !== 'teste@gmail.com') {
      throw new Error('E-mail inválido');
    }

    if (form.password !== '123456') {
      throw new Error('Senha incorreta');
    }

    const fakeUser: TUser = {
      id: 1,
      documentId: 'doc123',
      name: 'Usuário Teste',
    };

    await setItemAsync('accessToken', 'token');
    await setItemAsync('refreshToken', 'refresh');

    setUser(fakeUser);
  };

  const logout = async (isDelete = true) => {
    setUser(null);

    if (isDelete) {
      try {
        await deleteItemAsync('accessToken');
        await deleteItemAsync('refreshToken');
      } catch (error) {
        console.error('Erro ao deletar tokens:', error);
      }
    }

    queryClient.clear();
  };

  const acceptTerms = () => {
    return;
  };

  const refreshAccessToken = (): Promise<string | null> => {
    // Se tiver token, busca o usuário (aqui você faria a chamada real da API)
    // if (accessToken === 'token') {
    //   const fakeUser: TUser = {
    //     id: 1,
    //     documentId: 'doc123',
    //     name: 'Usuário Teste',
    //   };
    //   setUser(fakeUser);
    //   return accessToken;
    // }

    return Promise.resolve(null);
  };

  useEffect(() => {
    let mounted = true;

    const getToken = async () => {
      try {
        await refreshAccessToken();
      } catch (err) {
        console.error('Auth error:', err);
        setUser(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (isAppReady) {
      getToken();
    }

    return () => {
      mounted = false;
    };
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
