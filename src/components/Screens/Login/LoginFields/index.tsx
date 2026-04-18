import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Input } from '@/components/ui';
import { LoginForm } from '@/validation/login.validation';

import { LoginActions } from '../LoginActions';
import { LoginFooter } from '../LoginFooter';

type Props = {
  control: UseFormReturn<LoginForm>['control'];
  onSubmit: () => void;
};

export const LoginFields = ({ control, onSubmit }: Props) => {
  return (
    <View className="mb-4 mt-6 gap-6 px-4 py-3">
      <Input
        control={control}
        keyboardType="email-address"
        label="E-mail"
        name="email"
        placeholder="Digite seu e-mail"
      />

      <Input
        isPassword
        control={control}
        label="Senha"
        name="password"
        placeholder="Digite sua senha"
      />

      <LoginActions control={control as any} />

      <Button
        layout={undefined}
        text="Entrar"
        textClassName="text-base font-roboto_bold p-1"
        onPress={onSubmit}
      />

      <LoginFooter />
    </View>
  );
};
