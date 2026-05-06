import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Text, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { ClockIcon } from '@/assets/icons';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/useAuth';
import { colors } from '@/global/colors';
import { fontFamily } from '@/global/fontFamily';
import { useErrorModal } from '@/store/errorModalStore';
import { useOTPModal } from '@/store/otpModalStore';
import { formatTime } from '@/utils/format';

const CODE_LENGTH = 6;
const TIMER_SECONDS = 300;
const RESEND_COOLDOWN = 30;

const OTPModal = () => {
  const { otpModal } = useOTPModal();
  const { completeLogin, resendOTPCode } = useAuth();
  const { openErrorModal } = useErrorModal();

  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const visible = !!otpModal?.visible;

  useEffect(() => {
    if (visible) {
      setCode(Array(CODE_LENGTH).fill(''));
      setSeconds(TIMER_SECONDS);
      setResendCooldown(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || seconds <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, visible]);

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

  const handleResend = async () => {
    if (resendCooldown > 0 || !otpModal) {
      return;
    }

    try {
      setResendCooldown(RESEND_COOLDOWN);
      setSeconds(TIMER_SECONDS);
      setCode(Array(CODE_LENGTH).fill(''));
      await resendOTPCode({
        email: otpModal.email,
        challengeId: otpModal.challengeId,
      });
    } catch {
      openErrorModal({
        title: 'Erro ao reenviar',
        message: 'Não foi possível reenviar o código. Tente novamente.',
        buttonText: 'Tentar novamente',
      });
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== CODE_LENGTH || !otpModal) {
      return;
    }

    setIsLoading(true);
    try {
      await completeLogin({
        email: otpModal.email,
        code: fullCode,
        challengeId: otpModal.challengeId,
      });
    } catch {
      openErrorModal({
        title: 'Código inválido',
        message:
          'O código informado é inválido ou expirou.\nVerifique e tente novamente.',
        buttonText: 'Tentar novamente',
      });
      setCode(Array(CODE_LENGTH).fill(''));
    } finally {
      setIsLoading(false);
    }
  };

  const isFilled = (index: number) => code[index] !== '';
  const isResendDisabled = resendCooldown > 0 || seconds <= 0;
  const isSubmitDisabled = code.join('').length < CODE_LENGTH || isLoading;

  if (!visible) {
    return null;
  }

  return (
    <Modal
      statusBarTranslucent
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => { }}
    >
      <Animated.View
        className="absolute inset-0 flex-1 items-center justify-center bg-black/70"
        entering={FadeIn}
        exiting={FadeOut}
        style={{ flex: 1 }}
      >
        <View className="mx-5 w-[90%] max-w-sm rounded-2xl bg-white px-6 py-8">
          {/* Header */}
          <View className="mb-6 items-center">
            <Text className="font-poppins_bold text-xl text-primary-100">
              Verificação de segurança
            </Text>

            <Text className="mt-2 text-center font-poppins_regular text-sm text-neutral-80">
              Insira o código de 6 dígitos enviado para o seu e-mail para
              continuar.
            </Text>
          </View>

          {/* Inputs OTP */}
          <View className="flex-row justify-center gap-2.5">
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

          <View className="mb-6 mt-5 flex-row items-center justify-center gap-1">
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

          <View className="mb-6 items-center">
            <Text className="font-poppins_regular text-sm text-[#616161]">
              Não recebeu o código?{' '}
              <Text
                className="font-poppins_bold text-primary-100"
                style={isResendDisabled ? { opacity: 0.5 } : undefined}
                onPress={handleResend}
              >
                {resendCooldown > 0
                  ? `Reenviar (${resendCooldown}s)`
                  : 'Reenviar'}
              </Text>
            </Text>
          </View>

          {/* Botão confirmar */}
          <Button
            disabled={isSubmitDisabled}
            layout={undefined}
            text={
              isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                'Confirmar'
              )
            }
            onPress={handleSubmit}
          />
        </View>
      </Animated.View>
    </Modal>
  );
};

export default OTPModal;
