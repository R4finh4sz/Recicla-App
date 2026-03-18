import { ClockIcon } from "@/assets/icons";
import { Button } from "@/components/ui";
import { BackButton } from "@/components/ui/BackButton";
import { colors } from "@/global/colors";
import { fontFamily } from "@/global/fontFamily";
import { formatTime } from "@/utils/format";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const CODE_LENGTH = 6;
const TIMER_SECONDS = 300;
const RESEND_COOLDOWN = 30;

type Props = {
  onSubmit: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
};

const ForgotPasswordCode = ({ onSubmit, onResend, onBack }: Props) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(RESEND_COOLDOWN);
    setCode(Array(CODE_LENGTH).fill(""));
    onResend();
  };

  const handleSubmit = () => {
    const fullCode = code.join("");
    if (fullCode.length === CODE_LENGTH) {
      onSubmit(fullCode);
    }
  };

  const isFilled = (index: number) => code[index] !== "";
  const isResendDisabled = resendCooldown > 0;

  return (
    <KeyboardAvoidingView className="flex-1 bg-white p-5 pt-4">
      <BackButton Title="Voltar" Onpress={onBack} />

      <View className="items-center pt-12">
        <Text className="text-lg font-montserrat_bold text-primary-100">
          Digite seu código
        </Text>
        <Text className="mb-6 mt-2 text-sm font-montserrat_regular text-[#616161] text-center">
          Insira o código que enviamos para o seu e-mail para continuar a
          redefinição da sua senha.
        </Text>
      </View>

      <View className="flex-row justify-center gap-2.5 mt-10">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            className={`w-12 h-14 rounded-[10px] border-[1.5px] text-center text-[22px] ${isFilled(index)
              ? "border-primary-100 bg-primary-20"
              : "border-neutral-40 bg-[#FCFCFC]"
              }`}
            style={{
              fontFamily: fontFamily.montserrat_bold,
              color: colors.primary[100],
            }}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
          />
        ))}
      </View>

      <View className="mt-8 mb-8 flex-row items-center justify-center gap-1">
        <ClockIcon />
        <Text className="text-sm font-montserrat_regular text-[#616161]">
          Código expira em{" "}
          <Text className="font-montserrat_bold text-primary-100">
            {formatTime(seconds)}
          </Text>
        </Text>
      </View>

      <View className="items-center mt-10">
        <Text className="text-sm font-montserrat_regular text-[#616161]">
          Não recebeu o código?{" "}
          <Text
            className="font-montserrat_bold text-primary-100"
            onPress={handleResend}
            style={isResendDisabled ? { opacity: 0.5 } : undefined}
          >
            {isResendDisabled ? `Reenviar (${resendCooldown}s)` : "Reenviar"}
          </Text>
        </Text>
      </View>

      <View className="flex-1 justify-end">
        <Button
          text="Continuar"
          onPress={handleSubmit}
          disabled={code.join("").length < CODE_LENGTH}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordCode;

