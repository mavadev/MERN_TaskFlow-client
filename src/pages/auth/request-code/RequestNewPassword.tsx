import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import RequestCode from './RequestCode';
import { requestNewPassword } from '@/api/AuthAPI';
import type { ResendCodeForm } from '@/interfaces/auth';

const RequestNewPassword = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { email: emailState } = location.state || {};
	const [email, setEmail] = useState(emailState || '');

	const { mutate } = useMutation({
		mutationFn: requestNewPassword,
		onSuccess: message => {
			toast.success(message);
			navigate('/auth/forgot-password', { state: { email } });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleResendCode = (formData: ResendCodeForm) => {
		mutate(formData);
		setEmail(formData.email);
	};

	return (
		<div className='max-w-md text-center'>
			<h2 className='text-4xl font-normal'>Olvidaste tu contraseña?</h2>
			<p className='mt-5 text-xl font-light'>
				Enviaremos un correo con indicaciones para que puedas cambiar tu contraseña.
			</p>
			<RequestCode
				email={email}
				handleComplete={handleResendCode}
			/>
		</div>
	);
};

export default RequestNewPassword;
