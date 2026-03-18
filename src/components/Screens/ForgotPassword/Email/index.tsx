import { Button, Input } from "@/components/ui";
import { BackButton } from "@/components/ui/BackButton";
import { LoginForm } from "@/validation/login.validation";
import { UseFormReturn } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type Props = {
  control: UseFormReturn<LoginForm>['control'];
  onSubmit: () => void;
};

const ForgotPasswordEmail = ({ control, onSubmit }: Props) => {
  return (
    <KeyboardAvoidingView className="flex-1 bg-white p-5 pt-4">
      <BackButton Title="Voltar" />
      <View className="items-center pt-12">
        <Text className="text-lg font-montserrat_bold text-primary-100">Esqueceu sua senha?</Text>
        <Text className="mb-6 mt-2 text-sm font-montserrat_regular text-[#616161] text-center">Não se preocupe. Informe seu e-mail e enviaremos as instruções para redefinir sua senha.</Text>
      </View>
      <Input
        control={control}
        keyboardType="email-address"
        label="E-mail"
        name="identifier"
        placeholder="Digite seu e-mail"
      />
      <View className="flex-1 justify-end">
        <Button text="Continuar" onPress={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordEmail;
