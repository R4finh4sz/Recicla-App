import ForgotPasswordCode from "@/components/Screens/ForgotPassword/Code";
import ForgotPasswordEmail from "@/components/Screens/ForgotPassword/Email";
import ModalBackdrop from "@/components/ui/Modais/ModalBackdrop";
import { LoginForm } from "@/validation/login.validation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

const ForgotPasswordIndex = () => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [modal, setModal] = useState<ModalState>({ visible: false, title: '', message: '', onClose: () => { } });

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: __DEV__
      ? { identifier: 'teste@gmail.com', requestRefresh: false }
      : { identifier: '', requestRefresh: false },
  });

  const closeModal = () => setModal(prev => ({ ...prev, visible: false }));

  const handleEmailSubmit = handleSubmit(() => {
    setModal({
      visible: true,
      title: 'E-mail enviado!',
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
      title: 'Código validado!',
      message: 'Seu código foi verificado com sucesso.',
      onClose: () => {
        closeModal();
      },
    });
  };

  const handleResend = () => {
    setModal({
      visible: true,
      title: 'Código reenviado!',
      message: 'Enviamos um novo código de verificação para o seu e-mail.',
      onClose: () => {
        closeModal();
      },
    });
  };

  return (
    <>
      {step === 'code' ? (
        <ForgotPasswordCode onSubmit={handleCodeSubmit} onResend={handleResend} onBack={() => setStep('email')} />
      ) : (
        <ForgotPasswordEmail control={control} onSubmit={handleEmailSubmit} />
      )}

      <ModalBackdrop
        visible={modal.visible}
        variant="success"
        title={modal.title}
        message={modal.message}
        showButton
        buttonText="Continuar"
        onClose={modal.onClose}
      />
    </>
  );
};

export default ForgotPasswordIndex;
