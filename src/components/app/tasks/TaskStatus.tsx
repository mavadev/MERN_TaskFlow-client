import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { statusTranslate } from '@/locales/es';

export const statusStyles: { [key: string]: string } = {
	pending: 'bg-slate-200 border-slate-500 text-gray-600',
	onHold: 'bg-red-200 border-red-500 text-red-600',
	inProgress: 'bg-blue-200 border-blue-500 text-blue-600',
	underReview: 'bg-amber-200 border-amber-500 text-amber-600',
	completed: 'bg-emerald-200 border-emerald-500 text-emerald-600',
};

type TaskStatusProps = {
	status: string;
};

export const TaskStatus = ({ status }: TaskStatusProps) => {
	const navigate = useNavigate();
	const handleCreateTask = () => navigate(location.pathname + `?mode=create&status=${status}`);

	return (
		<div
			className={`flex items-center justify-between w-full select-none p-3 rounded-t border-b-8 ${statusStyles[status]} opacity-80`}>
			<h3 className='capitalize font-bold'>{statusTranslate[status]}</h3>
			<button onClick={handleCreateTask}>
				<PlusCircleIcon width={25} />
			</button>
		</div>
	);
};
