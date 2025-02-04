import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import { statusTranslate } from '@/locales/es';
import type { TaskStatus } from '@/interfaces/task.interface';
import type { TeamResponse } from '@/interfaces/team.interface';

type TaskFormProps<T extends { name: string; description: string; status: TaskStatus }> = {
	teamData: TeamResponse;
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
};

export default function TaskForm<T extends { name: string; description: string; status: TaskStatus }>({
	teamData,
	errors,
	register,
}: TaskFormProps<T>) {
	return (
		<>
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='name'
					className='label-form'>
					Nombre
				</label>
				<input
					id='name'
					type='text'
					className='input-form'
					placeholder='Nombre de la tarea'
					{...register('name' as Path<T>, { required: 'El nombre de la tarea es obligatorio' })}
				/>
				{errors.name?.message && <ErrorMessage>{errors.name.message.toString()}</ErrorMessage>}
			</div>

			<div className='flex flex-col gap-2 '>
				<label
					htmlFor='description'
					className='label-form'>
					Descripción
				</label>
				<textarea
					rows={3}
					id='description'
					className='input-form resize-none'
					placeholder='Descripción de la tarea'
					{...register('description' as Path<T>, {
						required: 'La descripción de la tarea es obligatoria',
					})}
				/>
				{errors.description?.message && <ErrorMessage>{errors.description.message.toString()}</ErrorMessage>}
			</div>
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='assignedTo'
					className='label-form'>
					Asignado a
				</label>
				<select
					id='assignedTo'
					className='input-form select-none'
					{...register('assignedTo' as Path<T>)}>
					<option value={''}>Sin asignar</option>
					<option
						key={teamData.manager._id}
						value={teamData.manager._id}>
						{teamData.manager.name}
					</option>
					{teamData.team.map(teamMember => (
						<option
							key={teamMember._id}
							value={teamMember._id}>
							{teamMember.name}
						</option>
					))}
				</select>
				{errors.status?.message && <ErrorMessage>{errors.status.message.toString()}</ErrorMessage>}
			</div>
			<div className='flex flex-col gap-2'>
				<label
					htmlFor='status'
					className='label-form'>
					Estado de la Tarea
				</label>
				<select
					id='status'
					className='input-form select-none'
					{...register('status' as Path<T>, { required: 'El estado de la tarea es obligatoria' })}>
					{Object.entries(statusTranslate).map(([status, translate]) => (
						<option
							key={status}
							value={status}>
							{translate}
						</option>
					))}
				</select>
				{errors.status?.message && <ErrorMessage>{errors.status.message.toString()}</ErrorMessage>}
			</div>
		</>
	);
}
