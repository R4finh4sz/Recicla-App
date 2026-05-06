import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Image } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';

type Step1Props = {
  onNext: () => void;
  onBack: () => void;
};

export const SignupStep1 = ({ onNext, onBack }: Step1Props) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View className="px-4" style={{ paddingTop: insets.top + 16 }}>
        <BackButton Onpress={onBack} Title="Voltar" />
      </View>

      <View className="flex-1 items-center px-4 pb-8 pt-5">
        <Text className="text-center font-poppins_bold text-[22px] text-primary-100">
          Vamos começar!
        </Text>

        <Text className="mt-2 text-center font-poppins_regular text-sm text-neutral-80">
          Cadastre-se para ter acesso completo às funcionalidades.
        </Text>

        <Image
          contentFit="contain"
          source={require('@/assets/images/CadastroImagem1.png')}
          style={{ width: '100%', flex: 1, minHeight: 200 }}
        />

        <View className="mt-auto w-full items-center">
          <Button
            text="Prosseguir"
            textClassName="text-base font-roboto_bold p-1"
            width="100%"
            onPress={onNext}
          />
        </View>
      </View>
    </ScrollView>
  );
};
