import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/api/AuthAPI';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ForgotPasswordForm } from '@/interfaces/auth';

interface NewPasswordFormProps {
	email: string;
}

const NewPasswordForm = ({ email }: NewPasswordFormProps) => {
	const navigate = useNavigate();

	// Valores iniciales del formulario
	const initialValues: ForgotPasswordForm = {
		password: '',
		password_confirmation: '',
	};

	// Hook de formulario
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const { mutate } = useMutation({
		mutationFn: resetPassword,
		onSuccess: message => {
			toast.success(message);
			navigate('/auth/login');
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Función para registrar la cuenta
	const handleNewPassword = (formData: ForgotPasswordForm) => mutate({ email, password: formData.password });

	return (
		<form
			noValidate
			onSubmit={handleSubmit(handleNewPassword)}
			className='space-y-8 bg-white w-full max-w-md text-left mt-10'>
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
					placeholder='Ingresar Contraseña'
					{...register('password', {
						required: 'La contraseña es obligatoria',
						minLength: {
							value: 8,
							message: 'La contraseña debe tener al menos 8 caracteres',
						},
					})}
				/>
				{errors.password && <ErrorMessage error={errors.password.message as string} />}
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
						required: 'La contraseña es obligatoria',
						validate: value => value === watch('password') || 'Las contraseñas no coinciden',
					})}
				/>
				{errors.password_confirmation && <ErrorMessage error={errors.password_confirmation.message as string} />}
			</div>

			<input
				type='submit'
				value='Reestablecer Contraseña'
				className='bg-primary-600 hover:bg-primary-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
			/>
		</form>
	);
};

export default NewPasswordForm;
