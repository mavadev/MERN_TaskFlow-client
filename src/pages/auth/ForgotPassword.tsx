import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { NewPasswordToken, NewPasswordForm } from './reset_password';
import { LinksAuth } from '@/components/auth/LinksAuth';

const ForgotPassword = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { email } = location.state || {};

	const [token, setToken] = useState('');
	const [isCodeCorrect, setIsCodeCorrect] = useState(false);

	useEffect(() => {
		if (!email) {
			toast.error('No se encontró el correo');
			navigate('/auth/request-new-password');
		}
	}, [email, navigate]);

	const setCodeCorrect = () => setIsCodeCorrect(true);

	return (
		<div className='max-w-md text-center'>
			<h2 className='text-4xl font-normal'>Cambiar Contraseña</h2>
			<p className='text-xl font-light mt-5'>
				Ingresa el código que recibiste por correo a {''}
				<span className='text-secondary font-bold'>{email}</span>
			</p>

			{isCodeCorrect ? (
				<NewPasswordForm
					token={token}
					email={email}
				/>
			) : (
				<NewPasswordToken
					email={email}
					token={token}
					setToken={setToken}
					setCodeCorrect={setCodeCorrect}
				/>
			)}
		</div>
	);
};

export default ForgotPassword;
