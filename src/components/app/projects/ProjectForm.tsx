import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ProjectDraftData } from '@/interfaces/app';

interface ProjectFormProps {
	register: UseFormRegister<ProjectDraftData>;
	errors: FieldErrors<ProjectDraftData>;
}

export default function ProjectForm({ register, errors }: ProjectFormProps) {
	return (
		<>
			<div className='mb-5 space-y-3'>
				<label
					htmlFor='projectName'
					className='label-form'>
					Nombre del Proyecto
				</label>
				<input
					type='text'
					id='projectName'
					placeholder='Nombre del Proyecto'
					className='input-form'
					{...register('projectName', {
						required: 'El Titulo del Proyecto es obligatorio',
					})}
				/>

				{errors.projectName?.message && <ErrorMessage error={errors.projectName.message} />}
			</div>

			<div className='mb-5 space-y-3'>
				<label
					htmlFor='clientName'
					className='label-form'>
					Cliente del Proyecto
				</label>
				<input
					type='text'
					id='clientName'
					placeholder='Nombre del Cliente'
					className='input-form'
					{...register('clientName', {
						required: 'El Nombre del Cliente es obligatorio',
					})}
				/>

				{errors.clientName?.message && <ErrorMessage error={errors.clientName.message} />}
			</div>

			<div className='mb-5 space-y-3'>
				<label
					htmlFor='description'
					className='label-form'>
					Descripción
				</label>
				<textarea
					id='description'
					placeholder='Descripción del Proyecto'
					className='input-form'
					{...register('description', {
						required: 'Una descripción del proyecto es obligatoria',
					})}
				/>

				{errors.description?.message && <ErrorMessage error={errors.description.message} />}
			</div>
		</>
	);
}
