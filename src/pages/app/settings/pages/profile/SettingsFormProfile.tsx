import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '@/api/SettingsAPI';
import type { User } from '@/interfaces/user.interface';
import type { SettingsProfile } from '@/interfaces/settings.interface';

interface SettingsFormProfileProps {
	profile: User;
}

const SettingsFormProfile = ({ profile }: SettingsFormProfileProps) => {
	const queryClient = useQueryClient();
	const [isError, setIsError] = useState(false);

	// Valores iniciales
	const initialValues: SettingsProfile = {
		name: profile.name,
		email: profile.email,
		description: profile.description,
	};

	// Formulario
	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
	});

	// Mutación
	const { mutate, isPending } = useMutation({
		mutationFn: updateProfile,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			toast.success(message);
		},
		onError: error => {
			setValue('name', profile.name);
			setValue('email', profile.email);
			setValue('description', profile.description);

			toast.error(error.message);
		},
	});

	const handleUpdateProfile = (formUpdateProfile: SettingsProfile) => mutate(formUpdateProfile);
	const handleError = () => setIsError(true);

	return (
		<form
			className='flex-[2] space-y-5'
			onSubmit={handleSubmit(handleUpdateProfile, handleError)}>
			<div className='flex flex-col'>
				<label
					htmlFor='name'
					className='font-semibold mb-2'>
					Nombre
				</label>
				<input
					id='name'
					type='text'
					defaultValue={profile.name}
					className={`border border-gray-300 rounded text-sm p-2 ${isError && errors.name ? 'border-red-500' : ''}`}
					{...register('name', {
						required: 'El nombre es requerido',
						minLength: {
							value: 3,
							message: 'El nombre debe tener al menos 3 caracteres',
						},
						maxLength: {
							value: 50,
							message: 'El nombre debe tener máximo 50 caracteres',
						},
					})}
				/>
				<span className='text-sm text-gray-500 mt-1'>Nombre que se mostrará en tu perfil público.</span>
				{isError && errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
			</div>
			<div className='flex flex-col'>
				<label
					htmlFor='email'
					className='font-semibold mb-2'>
					Correo
				</label>
				<input
					id='email'
					type='email'
					defaultValue={profile.email}
					className={`border border-gray-300 rounded text-sm p-2 ${isError && errors.email ? 'border-red-500' : ''}`}
					{...register('email', {
						required: 'El correo es requerido',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.com+$/,
							message: 'El correo no es válido',
						},
					})}
				/>
				<span className='text-sm text-gray-500 mt-1'>Correo electrónico que se mostrará en tu perfil público.</span>
				{isError && errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
			</div>
			<div className='flex flex-col'>
				<label
					htmlFor='description'
					className='font-semibold mb-2'>
					Descripción
				</label>
				<textarea
					rows={3}
					id='description'
					className={`resize-none border border-gray-300 rounded text-sm p-2 ${
						isError && errors.description ? 'border-red-500' : ''
					}`}
					defaultValue={profile.description}
					{...register('description', {
						maxLength: {
							value: 160,
							message: 'La descripción debe tener máximo 160 caracteres',
						},
					})}
				/>
				<span className='text-sm text-gray-500 mt-1'>Descripción que se mostrará en tu perfil público.</span>
				{isError && errors.description && <span className='text-red-500 text-sm'>{errors.description.message}</span>}
			</div>
			<button
				type='submit'
				className='btn btn-primary w-full md:w-max'>
				{isPending ? 'Actualizando...' : 'Actualizar perfil'}
			</button>
		</form>
	);
};

export default SettingsFormProfile;
