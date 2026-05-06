import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ForgotPasswordCode from '@/components/Screens/ForgotPassword/Code';
import ForgotPasswordEmail from '@/components/Screens/ForgotPassword/Email';
import ForgotPasswordReset from '@/components/Screens/ForgotPassword/ResetPassword';
import ModalBackdrop from '@/components/ui/Modais/ModalBackdrop';
import {
  useRequestPasswordReset,
  useResetPassword,
  useValidateResetCode,
} from '@/hooks/api/useAuthApi';
import {
  ForgotPasswordEmailForm,
  ForgotPasswordEmailSchema,
} from '@/validation/forgot_password.validation';
import { ResetPasswordForm } from '@/validation/reset_password.validation';

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const ForgotPasswordIndex = () => {
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    message: '',
    onClose: () => { },
  });

  const { mutateAsync: requestReset, isPending: isRequesting } =
    useRequestPasswordReset();
  const { mutateAsync: validateCode, isPending: isValidating } =
    useValidateResetCode();
  const { mutateAsync: resetPassword, isPending: isResetting } =
    useResetPassword();

  const { control, handleSubmit } = useForm<ForgotPasswordEmailForm>({
    resolver: zodResolver(ForgotPasswordEmailSchema),
    mode: 'onChange',
    defaultValues: __DEV__
      ? { identifier: 'teste@gmail.com' }
      : { identifier: '' },
  });

  const closeModal = () => setModal(prev => ({ ...prev, visible: false }));

  const handleEmailSubmit = handleSubmit(async data => {
    try {
      await requestReset(data.identifier);
      setEmail(data.identifier);
      setModal({
        visible: true,
        title: 'Sucesso!',
        message: 'Enviamos um código de verificação para o seu e-mail.',
        onClose: () => {
          closeModal();
          setStep('code');
        },
      });
    } catch (error) {
      // Error handled by global handler
    }
  });

  const handleCodeSubmit = async (code: string) => {
    try {
      const response = await validateCode({ email, code });
      setResetToken(response.resetToken);
      setModal({
        visible: true,
        title: 'Sucesso!',
        message: 'Seu código foi verificado com sucesso.',
        onClose: () => {
          closeModal();
          setStep('reset');
        },
      });
    } catch (error) {
      // Error handled by global handler
    }
  };

  const handleResend = async () => {
    try {
      await requestReset(email);
      setModal({
        visible: true,
        title: 'Sucesso!',
        message: 'Enviamos um novo código de verificação para o seu e-mail.',
        onClose: () => {
          closeModal();
        },
      });
    } catch (error) {
      // Error handled by global handler
    }
  };

  const handleResetSubmit = async (data: ResetPasswordForm) => {
    try {
      await resetPassword({
        resetToken,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
      setModal({
        visible: true,
        title: 'Sucesso!',
        message: 'Sua senha foi redefinida com sucesso.',
        onClose: () => {
          closeModal();
          router.push('/(auth)/login');
        },
      });
    } catch (error) {
      // Error handled by global handler
    }
  };

  return (
    <>
      {step === 'reset' ? (
        <ForgotPasswordReset
          isSubmitting={isResetting}
          onBack={() => setStep('code')}
          onSubmit={handleResetSubmit}
        />
      ) : step === 'code' ? (
        <ForgotPasswordCode
          isSubmitting={isValidating}
          onBack={() => setStep('email')}
          onResend={handleResend}
          onSubmit={handleCodeSubmit}
        />
      ) : (
        <ForgotPasswordEmail
          control={control}
          isSubmitting={isRequesting}
          onSubmit={handleEmailSubmit}
        />
      )}

      <ModalBackdrop
        showButton
        buttonText="Continuar"
        message={modal.message}
        title={modal.title}
        variant="success"
        visible={modal.visible}
        onClose={modal.onClose}
      />
    </>
  );
};

export default ForgotPasswordIndex;
