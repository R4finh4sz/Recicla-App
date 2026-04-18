import { useEffect, useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { ClockIcon } from '@/assets/icons';
import { Button } from '@/components/ui';
import { BackButton } from '@/components/ui/BackButton';
import KeyboardAwareScrollView from '@/components/ui/KeyboardAwareScrollView';
import { colors } from '@/global/colors';
import { fontFamily } from '@/global/fontFamily';
import { formatTime } from '@/utils/format';

const CODE_LENGTH = 6;
const TIMER_SECONDS = 300;
const RESEND_COOLDOWN = 30;

type Props = {
  onSubmit: (code: string) => void;
  onResend: () => void;
  onBack: () => void;
};

const ForgotPasswordCode = ({ onSubmit, onResend, onBack }: Props) => {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setResendCooldown(prev => prev - 1);
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
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (resendCooldown > 0) {
      return;
    }
    setResendCooldown(RESEND_COOLDOWN);
    setSeconds(TIMER_SECONDS);
    setCode(Array(CODE_LENGTH).fill(''));
    onResend();
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === CODE_LENGTH) {
      onSubmit(fullCode);
    }
  };

  const isFilled = (index: number) => code[index] !== '';
  const isResendDisabled = resendCooldown > 0;

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerClassName="p-5 pt-4 pb-0"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <BackButton Onpress={onBack} Title="Voltar" />

        <View className="items-center pt-12">
          <Text className="font-poppins_bold text-lg text-primary-100">
            Digite seu código
          </Text>

          <Text className="mb-6 mt-2 text-center font-poppins_regular text-sm text-[#616161]">
            Insira o código que enviamos para o seu e-mail para continuar a
            redefinição da sua senha.
          </Text>
        </View>

        <View className="mt-10 flex-row justify-center gap-2.5">
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              className={`h-14 w-12 rounded-[10px] border-[1.5px] text-center text-[22px] ${isFilled(index)
                  ? 'border-primary-100 bg-primary-20'
                  : 'border-neutral-40 bg-[#FCFCFC]'
                }`}
              keyboardType="number-pad"
              maxLength={1}
              style={{
                fontFamily: fontFamily.poppins_bold,
                color: colors.primary[100],
              }}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
            />
          ))}
        </View>

        <View className="mb-8 mt-8 flex-row items-center justify-center gap-1">
          <ClockIcon />

          {seconds === 0 ? (
            <Text className="font-poppins_regular text-sm text-[#616161]">
              Código expirado, solicite um novo abaixo
            </Text>
          ) : (
            <Text className="font-poppins_regular text-sm text-[#616161]">
              Código expira em{' '}
              <Text className="font-poppins_bold text-primary-100">
                {formatTime(seconds)}
              </Text>
            </Text>
          )}
        </View>

        <View className="mt-10 items-center">
          <Text className="font-poppins_regular text-sm text-[#616161]">
            Não recebeu o código?{' '}
            <Text
              className="font-poppins_bold text-primary-100"
              style={isResendDisabled ? { opacity: 0.5 } : undefined}
              onPress={handleResend}
            >
              {isResendDisabled ? `Reenviar (${resendCooldown}s)` : 'Reenviar'}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>

      <View className="p-5 pb-8 pt-5">
        <Button
          disabled={code.join('').length < CODE_LENGTH}
          layout={undefined}
          text="Continuar"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default ForgotPasswordCode;
