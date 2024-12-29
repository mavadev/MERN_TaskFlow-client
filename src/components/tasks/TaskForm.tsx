import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { TaskDraftData } from '@/interfaces';
import { ErrorMessage } from '../ErrorMessage';

type TaskFormProps = {
	errors: FieldErrors<TaskDraftData>;
	register: UseFormRegister<TaskDraftData>;
};

export default function TaskForm({ errors, register }: TaskFormProps) {
	return (
		<>
			<div className='flex flex-col'>
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
					{...register('name', {
						required: 'El nombre de la tarea es obligatorio',
					})}
				/>
				{errors.name?.message && <ErrorMessage error={errors.name.message} />}
			</div>

			<div className='flex flex-col '>
				<label
					htmlFor='description'
					className='label-form'>
					Descripción
				</label>
				<textarea
					id='description'
					className='input-form'
					placeholder='Descripción de la tarea'
					{...register('description', {
						required: 'La descripción de la tarea es obligatoria',
					})}
				/>
				{errors.description?.message && <ErrorMessage error={errors.description.message} />}
			</div>
		</>
	);
}
