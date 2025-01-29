import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import { RegisterForm, ResendCodeForm, ConfirmUserForm, LoginForm, ResetPassword } from '@/interfaces/auth.interface';

export async function createAccount(formData: RegisterForm) {
	try {
		const url = '/auth/register';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function requestConfirmAccount(formData: ResendCodeForm) {
	try {
		const url = '/auth/request-code-confirmation';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function confirmAccount(formData: ConfirmUserForm) {
	try {
		const url = '/auth/confirm-account';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function login(formData: LoginForm) {
	try {
		const url = '/auth/login';
		const { data } = await api.post<ResponseData>(url, formData);
		// Guardar token en localStorage
		localStorage.setItem('AUTH_TOKEN', data.data);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function requestNewPassword(formData: ResendCodeForm) {
	try {
		const url = '/auth/request-code-password';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function validateCodePassword(formData: ConfirmUserForm) {
	try {
		const url = '/auth/validate-code-password';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function resetPassword(formData: ResetPassword) {
	try {
		const url = '/auth/reset-password';
		const { data } = await api.post<ResponseData>(url, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
