import api from '@/lib/axios';
import { responseError } from './errors';
import { ConfirmAccountForm, RegisterForm, ResendCodeForm } from '@/interfaces/auth';

export async function createAccount(formData: RegisterForm): Promise<string> {
	try {
		const url = '/auth/register';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function confirmAccount(formData: ConfirmAccountForm): Promise<string> {
	try {
		const url = '/auth/confirm-account';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function resendCode(formData: ResendCodeForm): Promise<string> {
	try {
		const url = '/auth/resend-code';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
