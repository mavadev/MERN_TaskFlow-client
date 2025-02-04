import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { statusStyles } from '../TaskStatus';
import { UserItem } from '../../user/UserItem';
import { NoteList } from '../../notes/NoteList';

import { formatDate } from '@/utils';
import { statusTranslate } from '@/locales/es';
import { updateStatus, updateAssignTo } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { Task, TaskStatus } from '@/interfaces/task.interface';
import type { TeamMember, TeamResponse } from '@/interfaces/team.interface';

type TaskViewModalProps = {
	task: Task;
	team: TeamResponse;
};

export default function TaskViewModal({ task, team }: TaskViewModalProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const taskId = searchParams.get('taskId')!;
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const successChange = (message: string) => {
		toast.success(message);
		queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		queryClient.invalidateQueries({ queryKey: ['project', projectId] });
	};

	const errorChange = (error: Error) => {
		toast.error(error.message);
		navigate(location.pathname);
	};

	// CAMBIAR USUARIO ASIGNADO
	const handleChangeAssignTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const assignTo = e.target.value as TeamMember['_id'];
		updateAssignTo({ projectId, taskId, assignTo }).then(successChange).catch(errorChange);
	};

	// CAMBIAR ESTADO DE TAREA
	const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value as TaskStatus;
		updateStatus({ projectId, taskId, status }).then(successChange).catch(errorChange);
	};

	return (
		<div className='py-5'>
			<header className='px-10 py-5 space-y-5'>
				<span className={`px-2 py-1 rounded border-2 text-xs font-semibold ${statusStyles[task.status]} uppercase`}>
					{statusTranslate[task.status]}
				</span>
				<h2 className='font-bold text-2xl text-slate-700 line-clamp-2'>{task.name}</h2>
			</header>
			<main className='px-10 space-y-5'>
				{/* Descripción */}
				<section className='rounded bg-secondaryContainer p-4 text-slate-700 space-y-2'>
					<p className='font-semibold text-onSecondaryContainer'>Descripción:</p>
					<p className='pl-3 text-sm text-onSecondaryContainer'>{task.description}</p>
				</section>

				{/* Notas */}
				<section className='space-y-2'>
					<h3 className='uppercase text-slate-700 font-bold'>Notas:</h3>
					<NoteList
						taskId={taskId}
						projectId={projectId}
						notes={task.notes}
					/>
				</section>

				{/* Estado y Asignado a */}
				<section className='flex flex-col md:flex-row gap-5'>
					<div className='flex flex-col flex-1 space-y-2'>
						<label
							htmlFor='status'
							className='uppercase text-slate-700 font-bold'>
							Estado
						</label>
						<select
							id='status'
							defaultValue={task.status}
							onChange={handleChangeStatus}
							className='input-form select-none rounded'>
							{Object.entries(statusTranslate).map(([status, translate]) => (
								<option
									key={status}
									value={status}>
									{translate}
								</option>
							))}
						</select>
					</div>
					<div className='flex flex-col flex-1 space-y-2'>
						<label
							htmlFor='assignTo'
							className='uppercase text-slate-700 font-bold'>
							Asignado a
						</label>
						<select
							id='assignTo'
							className='input-form select-none rounded'
							onChange={handleChangeAssignTo}
							defaultValue={task.assignedTo?._id}>
							<option value=''>Sin asignar</option>
							<option
								key={team.manager._id}
								value={team.manager._id}>
								{team.manager.name}
							</option>
							{team.team.map(teamMember => (
								<option
									key={teamMember._id}
									value={teamMember._id}>
									{teamMember.name}
								</option>
							))}
						</select>
					</div>
				</section>
			</main>
			<footer className='px-10 py-5 flex items-end justify-between gap-5'>
				<div className=''>{task.assignedTo && <UserItem user={task.assignedTo} />}</div>
				<p className='text-sm text-slate-600'>
					Creado el: <span className='font-semibold'>{formatDate(task.createdAt)}</span>
				</p>
			</footer>
		</div>
	);
}
