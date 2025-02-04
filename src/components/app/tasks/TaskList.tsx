import { useMemo } from 'react';
import { TaskItem } from './TaskItem';
import { TaskStatus } from './TaskStatus';
import type { TaskSimple } from '@/interfaces/task.interface';

interface TaskListProps {
	tasks: TaskSimple[];
	isManager: boolean;
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

export const TaskList = ({ tasks, isManager }: TaskListProps) => {
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
		<section className='flex flex-col md:flex-row gap-3 w-max'>
			{Object.entries(groupedTasks).map(([status, statusTasks]) => (
				<article
					key={status}
					className='flex flex-col gap-3 w-60 md:w-60'>
					<TaskStatus
						key={status}
						status={status}
						isManager={isManager}
					/>
					<ul className='w-full space-y-2'>
						{statusTasks.length ? (
							statusTasks.map(task => (
								<TaskItem
									task={task}
									key={task._id}
									isManager={isManager}
								/>
							))
						) : (
							<h3 className='p-4 text-center text-slate-500'>No hay tareas</h3>
						)}
					</ul>
				</article>
			))}
		</section>
	);
};
