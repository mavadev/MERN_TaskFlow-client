import api from '@/lib/axios';
import { responseError } from './errors';
import { LoginForm, RegisterForm } from '@/interfaces/auth';

export async function createAccount(formData: RegisterForm): Promise<string> {
	try {
		const url = '/auth/register';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
