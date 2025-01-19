import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { NewPasswordToken, NewPasswordForm } from './reset_password';

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
				<span className='text-primary-600 font-bold'>{email}</span>
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

			<nav className='mt-5 text-sm text-right'>
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

export default ForgotPassword;
