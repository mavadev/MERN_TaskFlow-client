import { z } from 'zod';

// Create Account
const createAccountSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type RegisterForm = z.infer<typeof createAccountSchema>;

// Login
export type LoginForm = Pick<RegisterForm, 'email' | 'password'>;
