import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProfile } from '@/api/SettingsAPI';
import type { User } from '@/interfaces/user.interface';
import type { SettingsProfile } from '@/interfaces/settings.interface';
import { ErrorMessage } from '@/components/ErrorMessage';

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
					className={`input-form text-sm rounded border border-outline ${isError && errors.name ? 'border-error' : ''}`}
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
				{isError && errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
					className={`input-form text-sm rounded border border-outline ${
						isError && errors.email ? 'border-red-500' : ''
					}`}
					{...register('email', {
						required: 'El correo es requerido',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.com+$/,
							message: 'El correo no es válido',
						},
					})}
				/>
				<span className='text-sm text-gray-500 mt-1'>Correo electrónico que se mostrará en tu perfil público.</span>
				{isError && errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
					className={`resize-none input-form text-sm rounded border border-outline ${
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
				{isError && errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
			</div>
			<button
				type='submit'
				className='btn-primary w-full md:w-max px-4 py-2'>
				{isPending ? 'Actualizando...' : 'Actualizar perfil'}
			</button>
		</form>
	);
};

export default SettingsFormProfile;
