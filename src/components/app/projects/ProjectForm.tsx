import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ProjectDraft } from '@/interfaces/project.interface';

interface ProjectFormProps {
	register: UseFormRegister<ProjectDraft>;
	errors: FieldErrors<ProjectDraft>;
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
						maxLength: {
							value: 100,
							message: 'El Titulo del Proyecto no puede tener más de 70 caracteres',
						},
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
						maxLength: {
							value: 70,
							message: 'El Nombre del Cliente no puede tener más de 80 caracteres',
						},
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
						maxLength: {
							value: 300,
							message: 'La descripción no puede tener más de 300 caracteres',
						},
					})}
				/>

				{errors.description?.message && <ErrorMessage error={errors.description.message} />}
			</div>
		</>
	);
}
