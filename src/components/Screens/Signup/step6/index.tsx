import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Image } from '@/components/ui';

export const SignupStep6 = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      className="flex-1 bg-white px-4"
      style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
    >
      <View className="flex-1 items-center justify-between px-4 pt-10">
        <View className="w-full items-center">
          <Text className="text-center font-montserrat_bold text-[22px] text-primary-100">
            Cadastro enviado{'\n'}com sucesso!
          </Text>

          <Text className="mt-2 text-center font-montserrat_regular text-sm leading-7 text-neutral-80">
            Seu perfil passará por uma análise e poderá ser aprovado em até 48
            horas. Você será notificado assim que estiver tudo liberado.
          </Text>
        </View>

        <View className="mt-6 w-full flex-1 items-center justify-center">
          <Image
            contentFit="contain"
            source={require('@/assets/images/FinalImageSignup.png')}
            style={{ width: '110%', height: '100%' }}
          />
        </View>

        <View className="w-full items-center pb-6 pt-10">
          <Button
            text="Voltar ao login"
            textClassName="text-base font-roboto_bold p-1"
            width="100%"
            onPress={() => router.replace('/(auth)/login')}
          />
        </View>
      </View>
    </View>
  );
};
