import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignupPayload } from '@/app/(auth)/Signup';
import { Button, Image, Input, KeyboardAwareScrollView } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import {
  PersonalInfoForm,
  PersonalInfoSchema,
} from '@/validation/signup.validation';

type Step2Props = {
  initialData: Partial<SignupPayload>;
  onNext: (data: PersonalInfoForm) => void;
  onBack: () => void;
};

export const SignupStep2 = ({ initialData, onNext, onBack }: Step2Props) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PersonalInfoForm>({
    mode: 'onChange',
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      completename:
        initialData.completename || (__DEV__ ? 'Usuário Teste' : ''),
      cpf: initialData.cpf || (__DEV__ ? '12345678909' : ''),
      dateofnasciment:
        initialData.dateofnasciment || (__DEV__ ? '01/01/2000' : ''),
      phone: initialData.phone || (__DEV__ ? '11999999999' : ''),
    },
  });

  const onSubmitForm = (data: PersonalInfoForm) => {
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
          source={require('@/assets/images/Etapa1.png')}
          style={{ width: '70%', height: 150 }}
        />

        <Text className="mt-[-20px] text-center font-montserrat_bold text-[22px] text-primary-100">
          Cadastro
        </Text>

        <Text className="mb-10 mt-2 text-center font-montserrat_regular text-sm text-neutral-80">
          Informe seus dados para continuar.
        </Text>

        <View className="w-full gap-5">
          <Input
            control={control}
            label="Nome Completo"
            name="completename"
            placeholder="Digite seu nome completo"
          />

          <Input
            control={control}
            keyboardType="numeric"
            label="CPF"
            name="cpf"
            placeholder="Digite seu CPF"
            type="cpf"
          />

          <Input
            control={control}
            keyboardType="numeric"
            label="Data de Nascimento"
            name="dateofnasciment"
            placeholder="Digite sua data de nascimento"
            type="datetime"
          />

          <Input
            control={control}
            keyboardType="numeric"
            label="Telefone"
            name="phone"
            placeholder="Digite seu telefone"
            type="cel-phone"
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
