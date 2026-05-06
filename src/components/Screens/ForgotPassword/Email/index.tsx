import { UseFormReturn, useFormState } from 'react-hook-form';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Input } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import KeyboardAwareScrollView from '@/components/ui/KeyboardAwareScrollView';
import { ForgotPasswordEmailForm } from '@/validation/forgot_password.validation';

type Props = {
  control: UseFormReturn<ForgotPasswordEmailForm>['control'];
  isSubmitting?: boolean;
  onSubmit: () => void;
};

const ForgotPasswordEmail = ({ control, isSubmitting, onSubmit }: Props) => {
  const { isValid } = useFormState({ control });
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerClassName="p-5 pt-4 pb-0"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ paddingTop: insets.top }}>
          <BackButton Title="Voltar" />
        </View>

        <View className="items-center pt-12">
          <Text className="font-poppins_bold text-lg text-primary-100">
            Esqueceu sua senha?
          </Text>

          <Text className="mb-6 mt-2 text-center font-poppins_regular text-sm text-[#616161]">
            Não se preocupe. Informe seu e-mail e enviaremos as instruções para
            redefinir sua senha.
          </Text>
        </View>

        <Input
          control={control}
          keyboardType="email-address"
          label="E-mail"
          name="identifier"
          placeholder="Digite seu e-mail"
        />
      </KeyboardAwareScrollView>

      <View className="p-5 pb-8 pt-5">
        <Button
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          layout={undefined}
          text="Continuar"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordEmail;
