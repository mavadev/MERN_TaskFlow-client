import { z } from 'zod';

// Create Account
const authSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
	user: z.string(),
	token: z.string(),
});
export type AuthSchema = z.infer<typeof authSchema>;

export type LoginForm = Pick<AuthSchema, 'email' | 'password'>;
export type RegisterForm = Pick<AuthSchema, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type ConfirmAccountForm = Pick<AuthSchema, 'email' | 'token'>;
