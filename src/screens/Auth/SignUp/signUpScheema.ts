import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('email inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
