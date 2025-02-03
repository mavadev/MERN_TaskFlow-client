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
			<div className='space-y-3'>
				<label
					htmlFor='projectName'
					className='label-form'>
					Título del Proyecto
				</label>
				<input
					type='text'
					id='projectName'
					className='input-form'
					placeholder='Nombre del Proyecto'
					{...register('projectName', {
						required: 'El Titulo del Proyecto es obligatorio',
						maxLength: {
							value: 100,
							message: 'El Titulo del Proyecto no puede tener más de 70 caracteres',
						},
					})}
				/>

				{errors.projectName?.message && <ErrorMessage>{errors.projectName.message}</ErrorMessage>}
			</div>

			<div className='space-y-3'>
				<label
					htmlFor='clientName'
					className='label-form'>
					Cliente del Proyecto
				</label>
				<input
					type='text'
					id='clientName'
					className='input-form'
					placeholder='Nombre del Cliente'
					{...register('clientName', {
						required: 'El Nombre del Cliente es obligatorio',
						maxLength: {
							value: 70,
							message: 'El Nombre del Cliente no puede tener más de 80 caracteres',
						},
					})}
				/>

				{errors.clientName?.message && <ErrorMessage>{errors.clientName.message}</ErrorMessage>}
			</div>

			<div className='space-y-3'>
				<label
					htmlFor='description'
					className='label-form'>
					Descripción
				</label>
				<textarea
					rows={4}
					id='description'
					className='input-form resize-none'
					placeholder='Descripción del Proyecto'
					{...register('description', {
						required: 'Una descripción del proyecto es obligatoria',
						maxLength: {
							value: 300,
							message: 'La descripción no puede tener más de 300 caracteres',
						},
					})}
				/>

				{errors.description?.message && <ErrorMessage>{errors.description.message}</ErrorMessage>}
			</div>
		</>
	);
}
