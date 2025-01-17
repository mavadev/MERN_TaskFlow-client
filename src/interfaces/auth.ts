import { z } from 'zod';

// Create Account
const createAccountSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type CreateAccount = z.infer<typeof createAccountSchema>;

// Login
const loginSchema = z.object({
	email: z.string(),
	password: z.string(),
});
export type LoginForm = z.infer<typeof loginSchema>;
