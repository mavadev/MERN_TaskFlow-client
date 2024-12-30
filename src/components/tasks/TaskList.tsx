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

	const [tasksWithItems, tasksWithoutItems] = useMemo(() => {
		const withItems: [string, Task[]][] = [];
		const withoutItems: [string, Task[]][] = [];

		Object.entries(groupedTasks).forEach(([status, statusTasks]) => {
			if (statusTasks.length) withItems.push([status, statusTasks]);
			else withoutItems.push([status, statusTasks]);
		});

		return [withItems, withoutItems];
	}, [groupedTasks]);

	return (
		<main className='my-10 overflow-auto'>
			<section className='flex gap-3 pb-32 w-max'>
				{tasksWithItems.map(([status, statusTasks]) => (
					<article
						key={status}
						className='flex flex-col gap-3 w-60 md:w-60'>
						<TaskStatus
							key={status}
							status={status}
						/>
						<ul className='w-full space-y-2'>
							{statusTasks.map(task => (
								<TaskCard
									task={task}
									key={task._id}
								/>
							))}
						</ul>
					</article>
				))}
				{tasksWithoutItems.length ? (
					<article className='flex flex-col gap-2 w-40'>
						{tasksWithoutItems.map(([status]) => (
							<TaskStatus
								key={status}
								status={status}
							/>
						))}
					</article>
				) : (
					<></>
				)}
			</section>
		</main>
	);
};
