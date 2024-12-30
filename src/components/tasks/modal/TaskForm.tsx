import { FieldErrors, Path, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';

type TaskFormProps<T extends { name: string; description: string }> = {
	errors: FieldErrors<T>;
	register: UseFormRegister<T>;
};

export default function TaskForm<T extends { name: string; description: string }>({
	errors,
	register,
}: TaskFormProps<T>) {
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
					{...register('name' as Path<T>, { required: 'El nombre de la tarea es obligatorio' })}
				/>
				{errors.name?.message && <ErrorMessage error={String(errors.name.message)} />}
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
					{...register('description' as Path<T>, {
						required: 'La descripción de la tarea es obligatoria',
					})}
				/>
				{errors.description?.message && <ErrorMessage error={String(errors.description.message)} />}
			</div>
		</>
	);
}
