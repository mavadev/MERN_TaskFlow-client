import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { FormChangePassword } from '@/interfaces/settings.interface';
import { useMutation } from '@tanstack/react-query';
import { changePasswordProfile } from '@/api/SettingsAPI';
import { toast } from 'react-toastify';

const SettingsFormChangePassword = () => {
	const initialValues: FormChangePassword = {
		current_password: '',
		password: '',
		password_confirmation: '',
	};
	const {
		watch,
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormChangePassword>({ defaultValues: initialValues });

	// Mutación para cambiar contraseña
	const { mutate, isPending } = useMutation({
		mutationFn: changePasswordProfile,
		onSuccess: message => {
			toast.success(message);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Cambiar Contraseña
	const handleChangePassword = (formChangePassword: FormChangePassword) => {
		mutate(formChangePassword);
	};

	return (
		<form
			noValidate
			onSubmit={handleSubmit(handleChangePassword)}
			className='space-y-5 w-full max-w-md'>
			<div className='flex flex-col gap-3'>
				<label
					htmlFor='current_password'
					className='font-semibold'>
					Contraseña actual
				</label>

				<input
					type='password'
					id='current_password'
					className='input-form text-sm rounded'
					placeholder='Ingresar su contraseña actual'
					{...register('current_password', {
						required: 'La contraseña actual es obligatoria',
					})}
				/>
				{errors.current_password?.message && <ErrorMessage>{errors.current_password.message}</ErrorMessage>}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password'
					className='font-semibold'>
					Nueva Contraseña
				</label>

				<input
					id='password'
					type='password'
					className='input-form text-sm rounded'
					placeholder='Ingrese su nueva contraseña'
					{...register('password', {
						required: 'La nueva contraseña es obligatoria',
						minLength: {
							value: 8,
							message: 'La contraseña debe tener al menos 8 caracteres',
						},
					})}
				/>
				{errors.password?.message && <ErrorMessage>{errors.password.message}</ErrorMessage>}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password_confirmation'
					className='font-semibold'>
					Confirmar Contraseña
				</label>

				<input
					id='password_confirmation'
					type='password'
					className='input-form text-sm rounded'
					placeholder='Confirmar Contraseña'
					{...register('password_confirmation', {
						required: 'La confirmación es obligatoria',
						validate: value => value === watch('password') || 'Las contraseñas no coinciden',
					})}
				/>
				{errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
			</div>

			<button
				type='submit'
				disabled={isPending}
				className='btn btn-primary w-full !py-4 disabled:opacity-80 disabled:cursor-default'>
				{isPending ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
			</button>
		</form>
	);
};

export default SettingsFormChangePassword;
