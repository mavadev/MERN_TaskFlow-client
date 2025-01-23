import { z } from 'zod';

const authSchema = z.object({
	_id: z.string(),
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
export type ResendCodeForm = Pick<AuthSchema, 'email'>;
export type ConfirmUserForm = Pick<AuthSchema, 'email' | 'token'>;
export type ForgotPasswordForm = Pick<AuthSchema, 'password' | 'password_confirmation'>;
export type ResetPassword = Pick<AuthSchema, 'email' | 'password' | 'token'>;

// User
export const userSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string(),
	avatar: z.string(),
	username: z.string(),
	description: z.string(),
});
export type User = z.infer<typeof userSchema>;

export const userSearchSchema = userSchema.pick({
	_id: true,
	name: true,
	avatar: true,
	username: true,
	description: true,
});
export type UserSearch = z.infer<typeof userSearchSchema>;

export const usersSearchSchema = z.array(userSearchSchema);
export type UsersSearch = z.infer<typeof usersSearchSchema>;
