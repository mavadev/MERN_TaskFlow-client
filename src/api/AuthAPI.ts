import api from '@/lib/axios';
import { responseError } from './errors';
import { ConfirmUserForm, LoginForm, RegisterForm, ResendCodeForm, ResetPassword } from '@/interfaces/auth';

export async function createAccount(formData: RegisterForm): Promise<string> {
	try {
		const url = '/auth/register';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function confirmAccount(formData: ConfirmUserForm): Promise<string> {
	try {
		const url = '/auth/confirm-account';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function login(formData: LoginForm): Promise<string> {
	try {
		const url = '/auth/login';
		const { data } = await api.post(url, formData);
		// Guardar token en localStorage
		localStorage.setItem('AUTH_TOKEN', data.data);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function requestConfirmAccount(formData: ResendCodeForm): Promise<string> {
	try {
		const url = '/auth/request-code-confirmation';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function requestNewPassword(formData: ResendCodeForm): Promise<string> {
	try {
		const url = '/auth/request-code-password';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function validateCodePassword(formData: ConfirmUserForm): Promise<string> {
	try {
		const url = '/auth/validate-code-password';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function resetPassword(formData: ResetPassword): Promise<string> {
	try {
		const url = '/auth/reset-password';
		const { data } = await api.post(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getUser(): Promise<object> {
	try {
		const url = '/auth/user';
		const { data } = await api.get(url);
		return data.data;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
