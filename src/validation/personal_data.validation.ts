import z from 'zod/v3';

export const PersonalDataSchema = z.object({
  fullName: z.string().min(1, 'Informe seu nome completo'),
  username: z.string().min(1, 'Informe seu nome de usuário'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(1, 'Informe seu telefone'),
  birthDate: z.string().min(1, 'Informe sua data de nascimento'),
});

export type PersonalDataForm = z.infer<typeof PersonalDataSchema>;
