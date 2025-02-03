import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/api/AuthAPI';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ConfirmUserForm, ForgotPasswordForm } from '@/interfaces/auth.interface';

interface NewPasswordFormProps {
	email: ConfirmUserForm['email'];
	token: ConfirmUserForm['token'];
}

const NewPasswordForm = ({ email, token }: NewPasswordFormProps) => {
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
	const handleNewPassword = (formData: ForgotPasswordForm) => mutate({ token, email, password: formData.password });

	return (
		<form
			noValidate
			onSubmit={handleSubmit(handleNewPassword)}
			className='space-y-8 w-full max-w-md text-left mt-10'>
			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password'
					className='label-form'>
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
				{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password_confirmation'
					className='label-form'>
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
				{errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
			</div>

			<input
				type='submit'
				value='Reestablecer Contraseña'
				className='btn-primary w-full p-3 text-xl'
			/>
		</form>
	);
};

export default NewPasswordForm;
