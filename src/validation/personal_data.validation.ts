import { isAfter, isValid, parse, subYears } from 'date-fns';
import z from 'zod/v3';

export const PersonalDataSchema = z.object({
  fullName: z.string().min(1, 'Informe seu nome completo'),
  email: z.string().email('Informe um e-mail válido'),
  phone: z.string().min(1, 'Informe seu telefone'),
  birthDate: z
    .string()
    .min(1, 'Informe sua data de nascimento')
    .refine(val => {
      const date = parse(val, 'dd/MM/yyyy', new Date());
      return isValid(date);
    }, 'Informe uma data válida')
    .refine(val => {
      const date = parse(val, 'dd/MM/yyyy', new Date());
      const eighteenYearsAgo = subYears(new Date(), 18);
      return !isAfter(date, eighteenYearsAgo);
    }, 'Você deve ter pelo menos 18 anos')
    .refine(val => {
      const date = parse(val, 'dd/MM/yyyy', new Date());
      return date.getFullYear() >= 1930;
    }, 'Digite uma data válida'),
});

export type PersonalDataForm = z.infer<typeof PersonalDataSchema>;
