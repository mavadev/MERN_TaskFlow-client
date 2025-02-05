import { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { TaskStatus } from './TaskStatus';
import type { TaskSimple } from '@/interfaces/task.interface';

interface TaskListProps {
	tasks: TaskSimple[];
}
interface GroupTasks {
	[key: string]: TaskSimple[];
}
const initialStatusTasks: GroupTasks = {
	pending: [],
	onHold: [],
	inProgress: [],
	underReview: [],
	completed: [],
};

export const TaskList = ({ tasks }: TaskListProps) => {
	const groupedTasks = useMemo(
		() =>
			tasks.reduce((prev, curr) => {
				let currentGroup = prev[curr.status] ? [...prev[curr.status]] : [];
				currentGroup = [...currentGroup, curr];
				return { ...prev, [curr.status]: currentGroup };
			}, initialStatusTasks),
		[tasks]
	);

	return (
		<section className='flex-1 flex flex-col md:flex-row md:w-max gap-5 py-4 md:px-4'>
			{Object.entries(groupedTasks).map(([status, statusTasks]) => (
				<div className='flex flex-col gap-2'>
					<div className='max-md:px-4'>
						<TaskStatus
							key={status}
							status={status}
						/>
					</div>
					<ul className='flex flex-row md:flex-col gap-2 overflow-auto max-md:px-4'>
						{statusTasks.length ? (
							statusTasks.map(task => (
								<TaskItem
									task={task}
									key={task._id}
								/>
							))
						) : (
							<h3 className='p-4 text-center text-slate-500'>No hay tareas</h3>
						)}
					</ul>
				</div>
			))}
		</section>
	);
};
