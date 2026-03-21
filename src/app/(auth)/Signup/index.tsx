import { useState } from 'react';

import { SignupStep1 } from '@/components/Screens/Signup/step1';
import { SignupStep2 } from '@/components/Screens/Signup/step2';
import { SignupStep3 } from '@/components/Screens/Signup/step3';
import { SignupStep4 } from '@/components/Screens/Signup/step4';
import { SignupStep5 } from '@/components/Screens/Signup/step5';
import { SignupStep6 } from '@/components/Screens/Signup/step6';

export type SignupPayload = {
  completename?: string;
  cpf?: string;
  dateofnasciment?: string;
  phone?: string;
  cep?: string;
  endereco?: string;
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
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<SignupPayload>({});

  const handleNextStep = (stepData?: Partial<SignupPayload>) => {
    if (stepData) {
      setFormData(prevData => ({ ...prevData, ...stepData }));
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  const handleFinalSubmit = (finalStepData: Partial<SignupPayload>) => {
    const payloadCompleto = { ...formData, ...finalStepData };
    console.log('ENVIANDO PARA A API:', payloadCompleto);
    setCurrentStep(6);
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
          onBack={handlePrevStep}
          onNext={handleFinalSubmit}
        />
      )}

      {currentStep === 6 && <SignupStep6 />}
    </>
  );
};

export default SignupContainer;
