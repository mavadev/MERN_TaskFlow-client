import { Task } from '@/interfaces';
import { TaskCard } from './TaskCard';
import { useMemo } from 'react';
import { TaskStatus } from './TaskStatus';

interface TaskListProps {
	tasks: Task[];
}
interface GroupTasks {
	[key: string]: Task[];
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
		<main className='my-10 overflow-auto'>
			<section className='flex gap-3 pb-32 w-max'>
				{Object.entries(groupedTasks).map(([status, statusTasks]) => (
					<article
						key={status}
						className='flex flex-col gap-3 w-60 md:w-60'>
						<TaskStatus
							key={status}
							status={status}
						/>
						<ul className='w-full space-y-2'>
							{statusTasks.length ? (
								statusTasks.map(task => (
									<TaskCard
										task={task}
										key={task._id}
									/>
								))
							) : (
								<h3 className='p-4 text-center text-slate-500'>No hay tareas</h3>
							)}
						</ul>
					</article>
				))}
			</section>
		</main>
	);
};
