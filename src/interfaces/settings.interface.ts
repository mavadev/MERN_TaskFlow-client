import { z } from 'zod';
import type { User } from '@/interfaces/user.interface';

// Validar contraseña
export interface FormCheckPassword {
	password: string;
}

// Actualizar datos de perfil
export interface SettingsProfile {
	name: User['name'];
	email: User['email'];
	description: User['description'];
}

// Actualizar contribución de usuario
export interface SettingsContribution {
	collaborate: User['allowCollaborate'];
	collaborators: User['allowCollaborators'];
}

// Actualizar nombre de usuario
export interface FormUsername {
	username: User['username'];
}

// Cambiar Contraseña

export const formChangePasswordSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type FormChangePassword = z.infer<typeof formChangePasswordSchema>;
