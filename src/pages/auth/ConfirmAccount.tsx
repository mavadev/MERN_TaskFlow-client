import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { confirmAccount } from '@/api/AuthAPI';
import type { ConfirmAccountForm } from '@/interfaces/auth';

const ConfirmAccount = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = location.state || {};

	const [code, setCode] = useState<ConfirmAccountForm['token']>('');

	const { mutate } = useMutation({
		mutationFn: confirmAccount,
		onSuccess: message => {
			toast.success(message);
			navigate('/auth/login');
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleComplete = (token: ConfirmAccountForm['token']) => mutate({ email, token });

	useEffect(() => {
		if (!email) {
			toast.error('No se encontró el correo');
			navigate('/auth/register');
		}
	}, [email, navigate]);

	return (
		<div className='max-w-md text-center'>
			<h2 className='text-4xl font-normal'>Verificar Cuenta</h2>
			<p className='text-xl font-light mt-5'>
				Ingresa el código que recibiste por correo a {''}
				<span className='text-primary-600 font-bold'>{email}</span>
			</p>
			<form className='mt-10 px-5 py-5 rounded bg-primary-500 flex justify-stretch gap-3 h-24 md:h-28'>
				<PinInput
					value={code}
					onChange={setCode}
					onComplete={handleComplete}>
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
				</PinInput>
			</form>

			<nav className='mt-5 text-sm text-right'>
				<p>
					¿No recibiste el código?{' '}
					<Link
						state={{ email }}
						to='/auth/resend-code'
						className='font-bold text-primary-600 hover:text-primary-700 uppercase'>
						Solicitar código
					</Link>
				</p>
				<div className='mt-10 flex justify-center gap-5'>
					<Link
						to='/auth/login'
						className='btn btn-secondary px-5 py-3 uppercase text-lg'>
						Iniciar Sesión
					</Link>

					<Link
						to='/auth/register'
						className='btn btn-secondary px-5 py-3 uppercase text-lg'>
						Crear Cuenta
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default ConfirmAccount;
