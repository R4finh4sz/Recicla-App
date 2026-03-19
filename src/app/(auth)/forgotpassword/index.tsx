import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ForgotPasswordCode from '@/components/Screens/ForgotPassword/Code';
import ForgotPasswordEmail from '@/components/Screens/ForgotPassword/Email';
import ForgotPasswordReset from '@/components/Screens/ForgotPassword/ResetPassword';
import ModalBackdrop from '@/components/ui/Modais/ModalBackdrop';
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
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: '',
    message: '',
    onClose: () => { },
  });

  const { control, handleSubmit } = useForm<ForgotPasswordEmailForm>({
    resolver: zodResolver(ForgotPasswordEmailSchema),
    mode: 'onChange',
    defaultValues: __DEV__
      ? { identifier: 'teste@gmail.com' }
      : { identifier: '' },
  });

  const closeModal = () => setModal(prev => ({ ...prev, visible: false }));

  const handleEmailSubmit = handleSubmit(() => {
    setModal({
      visible: true,
      title: 'Sucesso!',
      message: 'Enviamos um código de verificação para o seu e-mail.',
      onClose: () => {
        closeModal();
        setStep('code');
      },
    });
  });

  const handleCodeSubmit = (code: string) => {
    console.log('Código enviado:', code);
    setModal({
      visible: true,
      title: 'Sucesso!',
      message: 'Seu código foi verificado com sucesso.',
      onClose: () => {
        closeModal();
        setStep('reset');
      },
    });
  };

  const handleResend = () => {
    setModal({
      visible: true,
      title: 'Sucesso!',
      message: 'Enviamos um novo código de verificação para o seu e-mail.',
      onClose: () => {
        closeModal();
      },
    });
  };

  const handleResetSubmit = (data: ResetPasswordForm) => {
    console.log('Nova senha:', data);
    setModal({
      visible: true,
      title: 'Sucesso!',
      message: 'Sua senha foi redefinida com sucesso.',
      onClose: () => {
        closeModal();
        router.push('/(auth)/login');
      },
    });
  };

  return (
    <>
      {step === 'reset' ? (
        <ForgotPasswordReset
          onBack={() => setStep('code')}
          onSubmit={handleResetSubmit}
        />
      ) : step === 'code' ? (
        <ForgotPasswordCode
          onBack={() => setStep('email')}
          onResend={handleResend}
          onSubmit={handleCodeSubmit}
        />
      ) : (
        <ForgotPasswordEmail control={control} onSubmit={handleEmailSubmit} />
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
