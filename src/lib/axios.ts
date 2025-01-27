import axios from 'axios';
import { responseSchema } from '@/interfaces/api.interface';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// Agregar el token al contexto de la aplicación
api.interceptors.request.use(config => {
	const token = localStorage.getItem('AUTH_TOKEN');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		delete config.headers.Authorization;
	}
	return config;
});

// Validación de respuesta
api.interceptors.response.use(
	response => {
		const { data, success } = responseSchema.safeParse(response.data);

		if (!success) {
			throw new Error('Estructura de respuesta inválida');
		}
		if (response.config.method === 'get' && !data.data) {
			console.error('No se obtuvo la data esperada');
			throw new Error('No se obtuvo la data esperada');
		}
		if (response.config.method !== 'get' && (!data.message || typeof data.message !== 'string')) {
			console.error('No se obtuvo el mensaje de respuesta');
			throw new Error('No se obtuvo el mensaje de respuesta');
		}
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

export default api;
