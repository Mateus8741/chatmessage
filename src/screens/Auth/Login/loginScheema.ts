import { z } from 'zod';

export const loginScheema = z.object({
  email: z.string().email('email inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

export type LoginSchema = z.infer<typeof loginScheema>;
