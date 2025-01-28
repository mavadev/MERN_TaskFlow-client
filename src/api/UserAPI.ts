import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import { FormChangePassword, User, userSchema } from '@/interfaces/user.interface';

interface UserProps {
	formChangePassword: FormChangePassword;
}

export async function getProfile(): Promise<User> {
	try {
		const url = '/user';
		const { data } = await api.get<ResponseData>(url);

		const { success, data: user } = userSchema.safeParse(data.data);
		if (!success) throw new Error('Error al obtener el usuario');

		return user;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function changePasswordProfile({ formChangePassword }: UserProps) {
	try {
		const url = '/user/change-password';
		const { data } = await api.post<ResponseData>(url, formChangePassword);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
