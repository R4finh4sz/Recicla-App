import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignupPayload } from '@/app/(auth)/Signup';
import { Button, Image, Input, KeyboardAwareScrollView } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import { AddressForm, AddressSchema } from '@/validation/signup.validation';

type Step2Props = {
  initialData: Partial<SignupPayload>;
  onNext: (data: AddressForm) => void;
  onBack: () => void;
};

export const SignupStep3 = ({ initialData, onNext, onBack }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AddressForm>({
    mode: 'onChange',
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      cep: initialData.cep || (__DEV__ ? '12345678' : ''),
      endereco: initialData.endereco || (__DEV__ ? 'Rua Teste' : ''),
      complemento:
        initialData.complemento || (__DEV__ ? 'Complemento Teste' : ''),
      cidade: initialData.cidade || (__DEV__ ? 'Cidade Teste' : ''),
      estado: initialData.estado || (__DEV__ ? 'SP' : ''),
    },
  });

  const onSubmitForm = (data: AddressForm) => {
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
          source={require('@/assets/images/Etapa2.png')}
          style={{ width: '70%', height: 150 }}
        />

        <Text className="mt-[-20px] text-center font-montserrat_bold text-[22px] text-primary-100">
          Cadastro
        </Text>

        <Text className="mb-10 mt-2 text-center font-montserrat_regular text-sm text-neutral-80">
          Informe os dados do seu endereço para continuar
        </Text>

        <View className="w-full gap-5">
          <Input
            control={control}
            keyboardType="numeric"
            label="CEP"
            name="cep"
            placeholder="Digite seu CEP"
            type="zip-code"
          />

          <Input
            control={control}
            label="Endereço"
            name="endereco"
            placeholder="Digite seu endereço"
          />

          <Input
            control={control}
            label="Complemento"
            name="complemento"
            placeholder="Digite o complemento"
          />

          <Input
            control={control}
            label="Cidade"
            name="cidade"
            placeholder="Digite sua cidade"
          />

          <Input
            control={control}
            keyboardType="numeric"
            label="Estado"
            name="estado"
            placeholder="Digite seu estado"
          />
        </View>

        <View className="mt-4 w-full items-center pt-6">
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
