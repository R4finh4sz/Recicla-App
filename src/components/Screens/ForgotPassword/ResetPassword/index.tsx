import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Button, Input } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import KeyboardAwareScrollView from '@/components/ui/KeyboardAwareScrollView';
import {
  ResetPasswordForm,
  ResetPasswordSchema,
} from '@/validation/reset_password.validation';

type Props = {
  onSubmit: (data: ResetPasswordForm) => void;
  onBack: () => void;
};

const ForgotPasswordReset = ({ onSubmit, onBack }: Props) => {
  const { control, handleSubmit, watch } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
  });

  const password = watch('password') || '';

  const rules = [
    { label: 'Pelo menos 8 caracteres', isValid: password.length >= 8 },
    { label: 'Uma letra maiúscula', isValid: /[A-Z]/.test(password) },
    { label: 'Uma letra minúscula', isValid: /[a-z]/.test(password) },
    { label: 'Um número', isValid: /[0-9]/.test(password) },
    {
      label: 'Um caractere especial (!#, $, @, &, *, !)',
      isValid: /[!#$@&*!]/.test(password),
    },
  ];

  const allRulesValid = rules.every(r => r.isValid);
  const confirmPassword = watch('confirmPassword');
  const isValidForm =
    allRulesValid && password === confirmPassword && password.length > 0;

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerClassName="p-5 pt-4"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <BackButton Onpress={onBack} Title="Voltar" />

        <View className="pt-12">
          <Text className="text-center font-montserrat_bold text-[22px] leading-[30px] text-primary-100">
            Cadastre a nova{'\n'}senha
          </Text>

          <Text className="mb-6 mt-4 text-center font-montserrat_regular text-sm leading-[22px] text-[#868686]">
            Crie uma nova senha segura para acessar sua conta. Certifique-se de
            que ela atenda aos requisitos abaixo e confirme para continuar.
          </Text>
        </View>

        <View className="gap-5">
          <Input
            isPassword
            control={control}
            label="Nova senha"
            name="password"
            placeholder="Digite sua nova senha"
          />

          <View className="gap-2 rounded-[10px] border border-primary-100 bg-[#E8F0EA] p-4">
            {rules.map((rule, idx) => (
              <View key={idx} className="flex-row items-center gap-2">
                <View
                  className={`h-2 w-2 rounded-full ${rule.isValid ? 'bg-primary-100' : 'bg-[#E33B32]'}`}
                />

                <Text className="font-montserrat_regular text-xs text-[#333333]">
                  {rule.label}
                </Text>
              </View>
            ))}
          </View>

          <Input
            isPassword
            control={control}
            label="Confirme sua senha"
            name="confirmPassword"
            placeholder="Digite novamente sua senha"
          />
        </View>
      </KeyboardAwareScrollView>

      <View className="p-5 pt-0">
        <Button
          disabled={!isValidForm}
          layout={undefined}
          text="Enviar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordReset;
