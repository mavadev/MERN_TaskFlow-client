export const formatDate = (date: string) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
