import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import type { FormChangePassword, SettingsContribution, SettingsProfile } from '@/interfaces/settings.interface';

interface SettingsProps {
	formUpdateProfile: SettingsProfile;
	formChangePassword: FormChangePassword;
	formCollaboration: SettingsContribution;
}

export async function updateProfile({ formUpdateProfile }: Pick<SettingsProps, 'formUpdateProfile'>) {
	try {
		const url = '/user/';
		const { data } = await api.patch<ResponseData>(url, formUpdateProfile);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateCollaboration({ formCollaboration }: Pick<SettingsProps, 'formCollaboration'>) {
	try {
		const url = '/user/collaboration';
		const { data } = await api.patch<ResponseData>(url, formCollaboration);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function changePasswordProfile({ formChangePassword }: Pick<SettingsProps, 'formChangePassword'>) {
	try {
		const url = '/user/change-password';
		const { data } = await api.post<ResponseData>(url, formChangePassword);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
