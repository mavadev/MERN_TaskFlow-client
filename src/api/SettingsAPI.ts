import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import type {
	FormChangePassword,
	FormCheckPassword,
	FormUsername,
	SettingsContribution,
	SettingsProfile,
} from '@/interfaces/settings.interface';

export async function checkPassword(formCheckPassword: FormCheckPassword) {
	try {
		const url = '/user/check-password';
		const { data } = await api.post<ResponseData>(url, formCheckPassword);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateProfile(formUpdateProfile: SettingsProfile) {
	try {
		const url = '/user/';
		const { data } = await api.patch<ResponseData>(url, formUpdateProfile);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateCollaboration(formCollaboration: SettingsContribution) {
	try {
		const url = '/user/collaboration';
		const { data } = await api.patch<ResponseData>(url, formCollaboration);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function changePasswordProfile(formChangePassword: FormChangePassword) {
	try {
		const url = '/user/change-password';
		const { data } = await api.post<ResponseData>(url, formChangePassword);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateUsername(formUsername: FormUsername) {
	try {
		const url = '/user/username';
		const { data } = await api.patch<ResponseData>(url, formUsername);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
