import z from 'zod/v3';

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Pelo menos 8 caracteres')
      .refine(val => /[A-Z]/.test(val), 'Uma letra maiúscula')
      .refine(val => /[a-z]/.test(val), 'Uma letra minúscula')
      .refine(val => /[0-9]/.test(val), 'Um número')
      .refine(val => /[!#$@&*!]/.test(val), 'Um caractere especial'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
