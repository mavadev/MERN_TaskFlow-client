import { z } from 'zod';

// Cambiar datos de perfil
export interface SettingsProfile {
	name: string;
	email: string;
	description: string;
}

// Cambiar Contraseña
export const formChangePasswordSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type FormChangePassword = z.infer<typeof formChangePasswordSchema>;
