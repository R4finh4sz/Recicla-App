import z from 'zod/v3';

import { isValidCPF } from '@/utils/cpf';

export const PersonalInfoSchema = z.object({
  completename: z.string().min(1, 'Informe seu nome completo'),
  cpf: z
    .string()
    .min(1, 'Informe seu CPF')
    .refine(val => isValidCPF(val), { message: 'CPF inválido' }),
  dateofnasciment: z.string().min(1, 'Informe sua data de nascimento'),
  phone: z.string().min(1, 'Informe seu telefone'),
});

export const AddressSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido'),
  endereco: z.string().min(1, 'Informe seu endereço'),
  numero: z.string().min(1, 'Informe o número'),
  complemento: z.string().optional(),
  cidade: z.string().min(1, 'Informe sua cidade'),
  estado: z
    .string()
    .min(2, 'Informe seu estado')
    .max(2, 'Use a sigla do estado (ex: SP)'),
});

export const ProfilePhotoSchema = z
  .object({
    profilephoto: z.string().optional(),
    email: z.string().email('Informe um email válido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const TermsSchema = z.object({
  agreesToTerms: z
    .boolean()
    .refine(val => val === true, 'Você precisa concordar com os termos'),
});

export type PersonalInfoForm = z.infer<typeof PersonalInfoSchema>;
export type AddressForm = z.infer<typeof AddressSchema>;
export type ProfilePhotoForm = z.infer<typeof ProfilePhotoSchema>;
export type TermsForm = z.infer<typeof TermsSchema>;

export type SignupPayload = PersonalInfoForm &
  AddressForm &
  ProfilePhotoForm &
  TermsForm;
