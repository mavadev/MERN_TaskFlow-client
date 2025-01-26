import { statusTranslate } from '@/locales/es';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const statusStyles: { [key: string]: string } = {
	pending: 'bg-slate-200 border-slate-500 text-gray-600',
	onHold: 'bg-red-200 border-red-500 text-red-600',
	inProgress: 'bg-blue-200 border-blue-500 text-blue-600',
	underReview: 'bg-amber-200 border-amber-500 text-amber-600',
	completed: 'bg-emerald-200 border-emerald-500 text-emerald-600',
};

type TaskStatusProps = {
	status: string;
	isManager: boolean;
};

export const TaskStatus = ({ status, isManager }: TaskStatusProps) => {
	const navigate = useNavigate();
	const handleNavigate = () => navigate(location.pathname + `?mode=create&status=${status}`, { replace: true });

	return (
		<div
			className={`flex items-center justify-between w-full select-none p-3 rounded-t border-b-8 ${statusStyles[status]} opacity-80`}>
			<h3 className='capitalize font-bold'>{statusTranslate[status]}</h3>
			{isManager && (
				<button onClick={handleNavigate}>
					<PlusCircleIcon width={25} />
				</button>
			)}
		</div>
	);
};
