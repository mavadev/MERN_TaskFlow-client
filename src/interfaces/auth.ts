import { z } from 'zod';

// Create Account
const createAccountSchema = z.object({
	name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
	email: z.string().email('El email no es válido'),
	password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
	password_confirmation: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
export type CreateAccount = z.infer<typeof createAccountSchema>;

// Login
const loginSchema = z.object({
	email: z.string().email('El email no es válido'),
	password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
export type LoginForm = z.infer<typeof loginSchema>;
