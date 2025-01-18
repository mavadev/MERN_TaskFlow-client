import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { requestNewPassword } from '@/api/AuthAPI';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ResendCodeForm } from '@/interfaces/auth';

const RequestNewPassword = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { email: emailUser } = location.state || {};

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { email: emailUser || '' } });

	const { mutate } = useMutation({
		mutationFn: requestNewPassword,
		onSuccess: message => {
			toast.success(message + ' ' + watch('email'));
			navigate('/auth/forgot-password', { state: { email: watch('email') } });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleResendCode = (formData: ResendCodeForm) => mutate(formData);

	return (
		<div className='max-w-md text-center'>
			<h2 className='text-4xl font-normal'>Olvidaste tu contraseña?</h2>
			<p className='mt-5 text-xl font-light'>
				Enviaremos un correo con indicaciones para que puedas cambiar tu contraseña.
			</p>
			<form
				className='mt-10'
				onSubmit={handleSubmit(handleResendCode)}>
				<input
					id='email'
					type='email'
					className='input-form mb-5 text-xl font-light text-center'
					placeholder='Ingrese su correo electrónico'
					{...register('email', {
						required: 'El correo electrónico es obligatorio',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'El correo electrónico no es válido',
						},
					})}
				/>
				{errors.email && <ErrorMessage error={errors.email.message as string} />}
				<input
					type='submit'
					className='mt-10 btn btn-secondary px-5 py-3 uppercase text-lg'
					value='Enviar Correo'
				/>
			</form>
		</div>
	);
};

export default RequestNewPassword;
