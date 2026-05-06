import type { AxiosError } from 'axios';
import axios from 'axios';

import { useErrorModal } from '@/store/errorModalStore';

const handleCustomErrors = (error: AxiosError<ApiErrorResponse>): string => {
  const errorMessage =
    error.response?.data?.error?.message || error.response?.data?.message;

  if (!errorMessage || typeof errorMessage !== 'string') {
    return 'Houve um imprevisto, tente novamente mais tarde';
  }

  if (errorMessage.includes('Too many requests, please try again later.')) {
    return 'Muitas requisições, tente mais tarde.';
  }

  if (errorMessage.includes('Your new password must be different')) {
    return 'Sua nova senha deve ser diferente da senha atual.';
  }

  if (
    errorMessage.includes('Passwords do not match') ||
    errorMessage.includes('The provided current password')
  ) {
    return 'Senha atual inválida';
  }

  if (errorMessage.includes('Invalid identifier or password')) {
    return 'Dados inválidos';
  }

  return errorMessage;
};

export const handleError = (
  err: AxiosError | string | Error | unknown,
): void => {
  // console.log(JSON.stringify(err, null, 2));

  const { openErrorModal } = useErrorModal.getState();

  if (axios.isAxiosError(err)) {
    return openErrorModal({
      title: 'Erro',
      message: handleCustomErrors(err),
    });
  }

  if (err instanceof Error) {
    return openErrorModal({
      title: 'Erro',
      message: err.message,
    });
  }

  if (typeof err === 'string') {
    return openErrorModal({
      title: 'Erro',
      message: err,
    });
  }

  return openErrorModal({
    title: 'Erro',
    message: 'Houve um imprevisto, tente novamente mais tarde',
  });
};

export const handleSuccess = (message: string): void => {
  // Success toast removed as requested
};

type ApiErrorResponse = {
  error?: {
    message?: string;
  };
  message?: string;
};
