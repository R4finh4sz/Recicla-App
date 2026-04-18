import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoginFields } from '@/components/Screens/Login/LoginFields';
import { LoginHeader } from '@/components/Screens/Login/LoginHeader';
import { LoginIntro } from '@/components/Screens/Login/LoginIntro';
import { KeyboardAwareScrollView } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { useErrorModal } from '@/store/errorModalStore';
import { LoginForm, LoginSchema } from '@/validation/login.validation';

const Login = () => {
  const { login, logout } = useAuth();
  const router = useRouter();
  const { openErrorModal } = useErrorModal();
  const insets = useSafeAreaInsets();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: __DEV__ ? 'spgustavorisio@gmail.com' : '',
      password: __DEV__ ? 'Senha@1234' : '',
      rememberMe: false,
    },
  });

  useEffect(() => {
    logout();
  }, []);

  const onSubmit: SubmitHandler<LoginForm> = async data => {
    try {
      await login(data);
      router.replace('/(main)/home');
    } catch {
      openErrorModal({
        title: 'Dados incorretos',
        message:
          'E-mail ou senha incorretos.\nVerifique os dados informados e tente novamente.',
        buttonText: 'Tentar novamente',
      });
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom + 10),
          paddingTop: Math.max(insets.top + 10),
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <LoginHeader />

        <View className="px-4">
          <LoginIntro />

          <LoginFields control={control} onSubmit={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;
