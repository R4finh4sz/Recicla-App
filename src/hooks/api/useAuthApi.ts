import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/queryKeys';
import { authService } from '@/services/api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  });
};

export const useRegisterMunicipe = () => {
  return useMutation({
    mutationFn: authService.registerMunicipe,
  });
};

export const useFetchActiveTerms = () => {
  return useQuery({
    queryKey: queryKeys.terms.active,
    queryFn: authService.fetchActiveTerms,
  });
};

export const useAcceptTermsPublic = () => {
  return useMutation({
    mutationFn: authService.acceptTermsPublic,
  });
};

export const useRefreshAccessToken = () => {
  return useMutation({
    mutationFn: authService.refreshAccessToken,
  });
};

export const useFetchUser = () => {
  return useQuery({
    queryKey: queryKeys.user.me,
    queryFn: authService.fetchUser,
  });
};
