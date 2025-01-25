import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import { User, userSchema } from '@/interfaces/user.interface';

export async function getUser(): Promise<User> {
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
