import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { changePasswordProfile } from '@/api/UserAPI';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FormChangePassword } from '@/interfaces/user.interface';

const SettingsAccount = () => {
	// Formulario
	const initialValues: FormChangePassword = {
		current_password: '',
		password: '',
		password_confirmation: '',
	};
	const {
		reset,
		watch,
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
	const handleChangePassword = (formData: FormChangePassword) => {
		mutate({ formChangePassword: formData });
	};

	return (
		<form
			noValidate
			onSubmit={handleSubmit(handleChangePassword)}
			className='space-y-8 bg-white w-full max-w-md text-left mt-10'>
			<div className='flex flex-col gap-3'>
				<label
					htmlFor='current_password'
					className='font-normal text-2xl'>
					Actual Contraseña
				</label>

				<input
					id='current_password'
					type='password'
					className='input-form'
					placeholder='Ingresar su contraseña actual'
					{...register('current_password', {
						required: 'La contraseña actual es obligatoria',
						minLength: {
							value: 8,
							message: 'La contraseña es de al menos 8 caracteres',
						},
					})}
				/>
				{errors.current_password?.message && <ErrorMessage error={errors.current_password.message} />}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password'
					className='font-normal text-2xl'>
					Nueva Contraseña
				</label>

				<input
					id='password'
					type='password'
					className='input-form'
					placeholder='Ingrese su nueva contraseña'
					{...register('password', {
						required: 'La nueva contraseña es obligatoria',
						minLength: {
							value: 8,
							message: 'La nueva contraseña debe tener al menos 8 caracteres',
						},
					})}
				/>
				{errors.password?.message && <ErrorMessage error={errors.password.message} />}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password_confirmation'
					className='font-normal text-2xl'>
					Confirmar Contraseña
				</label>

				<input
					id='password_confirmation'
					type='password'
					className='input-form'
					placeholder='Confirmar Contraseña'
					{...register('password_confirmation', {
						required: 'La confirmación es obligatoria',
						validate: value => value === watch('password') || 'Las contraseñas no coinciden',
					})}
				/>
				{errors.password_confirmation && <ErrorMessage error={errors.password_confirmation.message as string} />}
			</div>

			<input
				type='submit'
				disabled={isPending}
				value='Cambiar Contraseña'
				className='bg-primary-600 hover:bg-primary-700 w-full p-3 text-white font-black text-xl cursor-pointer'
			/>
		</form>
	);
};

export default SettingsAccount;
