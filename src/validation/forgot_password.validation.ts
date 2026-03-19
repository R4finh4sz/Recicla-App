import z from 'zod/v3';

export const ForgotPasswordEmailSchema = z.object({
  identifier: z.string().min(1, 'Informe seu e-mail').email('E-mail inválido'),
});

export type ForgotPasswordEmailForm = z.infer<typeof ForgotPasswordEmailSchema>;
