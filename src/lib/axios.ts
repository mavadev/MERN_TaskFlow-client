import axios from 'axios';

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

export default api;
