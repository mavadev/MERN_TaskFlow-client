import { isAxiosError } from 'axios';

export function responseError(error: Error): string {
	if (isAxiosError(error) && error.response?.data.error) {
		return error.response?.data.error;
	}
	if (error instanceof Error) return error.message;
	return 'Hubo un error en el servidor';
}
