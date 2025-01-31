import { z } from 'zod';

// Actualizar datos de perfil
export interface SettingsProfile {
	name: string;
	email: string;
	description: string;
}

// Actualizar contribución de usuario
export interface SettingsContribution {
	collaborate: boolean;
	collaborators: boolean;
}

// Cambiar Contraseña
export const formChangePasswordSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type FormChangePassword = z.infer<typeof formChangePasswordSchema>;
