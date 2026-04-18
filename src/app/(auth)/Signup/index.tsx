import axios, { AxiosError } from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { SignupStep1 } from '@/components/Screens/Signup/step1';
import { SignupStep2 } from '@/components/Screens/Signup/step2';
import { SignupStep3 } from '@/components/Screens/Signup/step3';
import { SignupStep4 } from '@/components/Screens/Signup/step4';
import { SignupStep5 } from '@/components/Screens/Signup/step5';
import { SignupStep6 } from '@/components/Screens/Signup/step6';
import {
  useAcceptTermsPublic,
  useRegisterMunicipe,
} from '@/hooks/api/useAuthApi';
import { useErrorModal } from '@/store/errorModalStore';
import { formatDateToEnUs, normalize } from '@/utils/format';

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};

export type SignupPayload = {
  completename?: string;
  cpf?: string;
  dateofnasciment?: string;
  phone?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  cidade?: string;
  estado?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  profilephoto?: string;
  agreesToTerms?: boolean;
};

const SignupContainer = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const { openErrorModal } = useErrorModal();
  const { mutateAsync: registerMunicipe, isPending: isRegistering } =
    useRegisterMunicipe();
  const { mutateAsync: acceptTermsPublic, isPending: isAcceptingTerms } =
    useAcceptTermsPublic();

  const [formData, setFormData] = useState<SignupPayload>({});

  const handleNextStep = (stepData?: Partial<SignupPayload>) => {
    if (stepData) {
      setFormData(prevData => ({ ...prevData, ...stepData }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep === 1) {
      router.back();
      return;
    }
    setCurrentStep(prev => prev - 1);
  };

  const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const apiError = err as AxiosError<ApiErrorResponse>;
      const message =
        apiError.response?.data?.error?.message ||
        apiError.response?.data?.message;

      if (typeof message === 'string' && message.trim()) {
        return message;
      }
    }

    if (err instanceof Error && err.message) {
      return err.message;
    }

    if (typeof err === 'string' && err.trim()) {
      return err;
    }

    return 'Houve um imprevisto, tente novamente mais tarde.';
  };

  const showSignupErrorModal = (message: string) => {
    openErrorModal({
      title: 'Não foi possível concluir o cadastro',
      message,
      buttonText: 'Tentar novamente',
    });
  };

  const handleFinalSubmit = async (finalStepData: Partial<SignupPayload>) => {
    const payloadCompleto = { ...formData, ...finalStepData };

    if (
      !payloadCompleto.completename ||
      !payloadCompleto.email ||
      !payloadCompleto.password ||
      !payloadCompleto.confirmPassword ||
      !payloadCompleto.cpf ||
      !payloadCompleto.dateofnasciment ||
      !payloadCompleto.endereco ||
      !payloadCompleto.numero ||
      !payloadCompleto.cep ||
      !payloadCompleto.cidade ||
      !payloadCompleto.estado ||
      !payloadCompleto.phone
    ) {
      showSignupErrorModal(
        'Preencha todos os dados obrigatórios para concluir o cadastro',
      );
      return;
    }

    const registerPayload = {
      nome: payloadCompleto.completename.trim(),
      email: payloadCompleto.email.trim(),
      password: payloadCompleto.password,
      confirmPassword: payloadCompleto.confirmPassword,
      cpf: normalize(payloadCompleto.cpf),
      dataNascimento: formatDateToEnUs(payloadCompleto.dateofnasciment),
      endereco: payloadCompleto.endereco.trim(),
      numero: payloadCompleto.numero.trim(),
      complemento: payloadCompleto.complemento?.trim() || undefined,
      cep: payloadCompleto.cep.trim(),
      cidade: payloadCompleto.cidade.trim(),
      estado: payloadCompleto.estado.trim().toUpperCase(),
      telefone: normalize(payloadCompleto.phone),
      imagemUrl: payloadCompleto.profilephoto?.trim() || undefined,
    };

    try {
      await registerMunicipe(registerPayload);
      await acceptTermsPublic();
      setCurrentStep(6);
    } catch (error) {
      showSignupErrorModal(getErrorMessage(error));
    }
  };

  return (
    <>
      {currentStep === 1 && (
        <SignupStep1 onBack={handlePrevStep} onNext={() => handleNextStep()} />
      )}

      {currentStep === 2 && (
        <SignupStep2
          initialData={formData}
          onBack={handlePrevStep}
          onNext={data => handleNextStep(data)}
        />
      )}

      {currentStep === 3 && (
        <SignupStep3
          initialData={formData}
          onBack={handlePrevStep}
          onNext={data => handleNextStep(data)}
        />
      )}

      {currentStep === 4 && (
        <SignupStep4
          initialData={formData}
          onBack={handlePrevStep}
          onNext={data => handleNextStep(data)}
        />
      )}

      {currentStep === 5 && (
        <SignupStep5
          initialData={formData}
          isSubmitting={isRegistering || isAcceptingTerms}
          onBack={handlePrevStep}
          onNext={handleFinalSubmit}
        />
      )}

      {currentStep === 6 && <SignupStep6 />}
    </>
  );
};

export default SignupContainer;
