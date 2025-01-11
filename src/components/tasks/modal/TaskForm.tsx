import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import { statusTranslate } from '@/locales/es';
import type { TaskStatus } from '@/interfaces';

type TaskFormProps<T extends { name: string; description: string; status: TaskStatus }> = {
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
};

export default function TaskForm<T extends { name: string; description: string; status: TaskStatus }>({
	errors,
	register,
}: TaskFormProps<T>) {
	return (
		<>
			<div className='flex flex-col'>
				<label
					htmlFor='name'
					className='label-form mb-3'>
					Nombre
				</label>
				<input
					id='name'
					type='text'
					className='input-form'
					placeholder='Nombre de la tarea'
					{...register('name' as Path<T>, { required: 'El nombre de la tarea es obligatorio' })}
				/>
				{errors.name?.message && <ErrorMessage error={String(errors.name.message)} />}
			</div>

			<div className='flex flex-col '>
				<label
					htmlFor='description'
					className='label-form mb-3'>
					Descripción
				</label>
				<textarea
					id='description'
					className='input-form'
					placeholder='Descripción de la tarea'
					{...register('description' as Path<T>, {
						required: 'La descripción de la tarea es obligatoria',
					})}
				/>
				{errors.description?.message && <ErrorMessage error={String(errors.description.message)} />}
			</div>
			<div className='flex flex-col'>
				<label
					htmlFor='status'
					className='label-form mb-3'>
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
				{errors.status?.message && <ErrorMessage error={String(errors.status.message)} />}
			</div>
		</>
	);
}
