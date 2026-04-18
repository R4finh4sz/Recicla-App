import '@/global/global.css';

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import { DefaultModal, ErrorModal } from '@/components/ui';
import { DropdownProvider } from '@/contexts/common/Dropdown';
import { AuthProvider, useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';
import { useDimensions, useUpdate } from '@/hooks/common';
import { useDropdownRouteReset } from '@/store/dropdownStore';
import { handleError } from '@/utils/handleError';

export { ErrorBoundary } from '@/components/ui/ErrorBoundary';

setDefaultOptions({ locale: ptBR });

const toastConfig: ToastConfig = {
  error: props => <ErrorToast {...props} text1NumberOfLines={2} />,
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 20000,
      retry: false,
      initialDataUpdatedAt: 0,
    },
    mutations: {
      onError: handleError,
    },
  },
});

const ProtectedStack = () => {
  const { user, loading } = useAuth();
  const { insets } = useDimensions();

  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
      }}
    >
      {!user ? (
        <Stack.Screen name="(auth)" options={{ animation: 'none' }} />
      ) : (
        <Stack.Screen name="(main)" options={{ animation: 'none' }} />
      )}
    </Stack>
  );
};

const RootLayout = () => {
  const isLoading = useUpdate();

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const isAppReady = !isLoading && fontsLoaded;

  useDropdownRouteReset();

  if (!isAppReady) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: colors.white }}
      >
        <KeyboardProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
              <AuthProvider isAppReady={isAppReady}>
                <DropdownProvider>
                  <StatusBar style="auto" />

                  <ProtectedStack />

                  <DefaultModal />

                  <ErrorModal />

                  <Toast config={toastConfig} />
                </DropdownProvider>
              </AuthProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </>
  );
};

export default RootLayout;
