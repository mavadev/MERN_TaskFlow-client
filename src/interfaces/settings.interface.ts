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

// Eliminar cuenta
export interface FormDeleteAccount {
	email: User['email'];
	password: string;
	confirmation: string;
}
export interface DeleteAccount {
	user_id: User['_id'];
}

// Cambiar color de tema
export type ColorThemes = 'red' | 'cyan' | 'orange' | 'blue' | 'purple' | 'green';
export interface ColorTheme {
	name: string;
	color: string;
	value: ColorThemes;
}

// Modo de Tema - Claro / Oscuro
export type Themes = 'light' | 'dark' | 'system';
export interface Theme {
	name: string;
	color: string;
	value: Themes;
}

// Cambiar Contraseña
export const formChangePasswordSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
export type FormChangePassword = z.infer<typeof formChangePasswordSchema>;
