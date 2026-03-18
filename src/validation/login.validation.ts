import z from 'zod/v3';

export const LoginSchema = z.object({
  identifier: z.string().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  password: z.string().min(1, 'Informe sua senha'),
  requestRefresh: z.boolean(),
});

export type LoginForm = z.infer<typeof LoginSchema>;
