import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import RequestCode from './RequestCode';
import { requestConfirmAccount } from '@/api/AuthAPI';
import type { ResendCodeForm } from '@/interfaces/auth.interface';

const RequestConfirmAccount = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { email: emailState } = location.state || {};

	const [email, setEmail] = useState(emailState || '');

	const { mutate } = useMutation({
		mutationFn: requestConfirmAccount,
		onSuccess: message => {
			toast.success(message);
			navigate('/auth/confirm-account', { state: { email } });
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
			<h2 className='text-4xl font-normal'>Solicitar Código</h2>
			<p className='mt-5 text-xl font-light'>
				Por favor, ingresa tu correo electrónico para recibir un nuevo código de confirmación.
			</p>
			<RequestCode
				email={email}
				handleComplete={handleResendCode}
			/>
		</div>
	);
};

export default RequestConfirmAccount;
