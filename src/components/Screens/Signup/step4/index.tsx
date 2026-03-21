import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignupPayload } from '@/app/(auth)/Signup';
import { Button, Image, Input, KeyboardAwareScrollView } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import { ProfilePhotoPicker } from '@/components/ui/ProfilePhotoPicker';
import {
  ProfilePhotoForm,
  ProfilePhotoSchema,
} from '@/validation/signup.validation';

type Step4Props = {
  initialData: Partial<SignupPayload>;
  onNext: (data: ProfilePhotoForm) => void;
  onBack: () => void;
};

export const SignupStep4 = ({ initialData, onNext, onBack }: Step4Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProfilePhotoForm>({
    mode: 'onChange',
    resolver: zodResolver(ProfilePhotoSchema),
    defaultValues: {
      email: initialData.email || (__DEV__ ? 'exemplo@email.com' : ''),
      password: initialData.password || (__DEV__ ? '12345678' : ''),
      confirmPassword:
        initialData.confirmPassword || (__DEV__ ? '12345678' : ''),
      profilephoto: initialData.profilephoto || '',
    },
  });

  const onSubmitForm = (data: ProfilePhotoForm) => {
    onNext(data);
  };

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white px-4"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
    >
      <View className="px-4 pt-4">
        <BackButton Onpress={onBack} Title="Voltar" />
      </View>

      <View className="flex-1 items-center px-4">
        <Image
          contentFit="contain"
          source={require('@/assets/images/Etapa3.png')}
          style={{ width: '70%', height: 150 }}
        />

        <Text className="mt-[-20px] text-center font-montserrat_bold text-[22px] text-primary-100">
          Cadastro
        </Text>

        <Text className="mb-10 mt-2 text-center font-montserrat_regular text-sm text-neutral-80">
          Estamos quase lá! Informe seus dados de acesso para concluir seu
          cadastro com segurança.
        </Text>

        <View className="mb-5">
          <Controller
            control={control}
            name="profilephoto"
            render={({ field: { onChange, value } }) => (
              <ProfilePhotoPicker imageUrl={value} onChangeImage={onChange} />
            )}
          />
        </View>

        <View className="w-full gap-5">
          <Input
            control={control}
            label="Email"
            name="email"
            placeholder="Digite seu email"
          />

          <Input
            isPassword
            control={control}
            label="Senha"
            name="password"
            placeholder="Digite sua senha"
          />

          <Input
            isPassword
            control={control}
            label="Confirmar Senha"
            name="confirmPassword"
            placeholder="Digite sua senha"
          />
        </View>

        <View className="mt-8 w-full items-center">
          <Button
            disabled={!isValid}
            text="Continuar"
            textClassName="text-base font-roboto_bold p-1"
            width="100%"
            onPress={handleSubmit(onSubmitForm)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
