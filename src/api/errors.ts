import { isAxiosError } from 'axios';

export function responseError(error: Error): string {
	if (isAxiosError(error) && error.response) {
		return error.response?.data.error || error.response.data.errors[0].msg;
	}
	if (error instanceof Error) return error.message;
	return 'Hubo un error en el servidor';
}
