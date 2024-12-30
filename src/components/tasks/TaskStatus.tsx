export const statusTranslate: { [key: string]: string } = {
	pending: 'Pendiente',
	onHold: 'En espera',
	inProgress: 'En progreso',
	underReview: 'En revisión',
	completed: 'Completado',
};

export const statusStyles: { [key: string]: string } = {
	pending: 'bg-slate-200 border-slate-500 text-gray-600',
	onHold: 'bg-red-200 border-red-500 text-red-600',
	inProgress: 'bg-blue-200 border-blue-500 text-blue-600',
	underReview: 'bg-amber-200 border-amber-500 text-amber-600',
	completed: 'bg-emerald-200 border-emerald-500 text-emerald-600',
};

export const TaskStatus = ({ status }: { status: string }) => {
	return (
		<h3
			className={`w-full select-none capitalize font-bold p-3 rounded-t border-b-8 ${statusStyles[status]} opacity-80`}>
			{statusTranslate[status]}
		</h3>
	);
};
