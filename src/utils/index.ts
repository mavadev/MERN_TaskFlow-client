export const formatDate = (date: string) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export const formatImage = (pathImage: string) => {
	const completeURL = `${import.meta.env.VITE_PUBLIC_URL}${pathImage}`;
	return completeURL;
};
