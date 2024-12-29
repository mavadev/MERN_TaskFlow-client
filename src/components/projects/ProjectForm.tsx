import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage';
import { ProjectDraftData } from '@/interfaces';

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
					className='font-bold text-gray-900 text-xl'>
					Proyecto:
				</label>
				<input
					type='text'
					id='projectName'
					placeholder='Nombre del Proyecto'
					className='w-full p-3 border border-gray-200'
					{...register('projectName', {
						required: 'El Titulo del Proyecto es obligatorio',
					})}
				/>

				{errors.projectName?.message && <ErrorMessage error={errors.projectName.message} />}
			</div>

			<div className='mb-5 space-y-3'>
				<label
					htmlFor='clientName'
					className='font-bold text-gray-900 text-xl'>
					Cliente:
				</label>
				<input
					type='text'
					id='clientName'
					placeholder='Nombre del Cliente'
					className='w-full p-3 border border-gray-200'
					{...register('clientName', {
						required: 'El Nombre del Cliente es obligatorio',
					})}
				/>

				{errors.clientName?.message && <ErrorMessage error={errors.clientName.message} />}
			</div>

			<div className='mb-5 space-y-3'>
				<label
					htmlFor='description'
					className='font-bold text-gray-900 text-xl'>
					Descripción:
				</label>
				<textarea
					id='description'
					placeholder='Descripción del Proyecto'
					className='w-full p-3 border border-gray-200'
					{...register('description', {
						required: 'Una descripción del proyecto es obligatoria',
					})}
				/>

				{errors.description?.message && <ErrorMessage error={errors.description.message} />}
			</div>
		</>
	);
}
