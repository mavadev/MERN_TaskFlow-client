import { Link } from 'react-router-dom';

export const LinksAuth = () => {
	return (
		<nav className='mt-5 text-sm text-right'>
			<div className='mt-10 flex justify-center gap-5'>
				<Link
					to='/auth/login'
					className='btn-primary px-5 py-3 uppercase'>
					Iniciar Sesión
				</Link>

				<Link
					to='/auth/register'
					className='btn-primary px-5 py-3 uppercase'>
					Crear Cuenta
				</Link>
			</div>
		</nav>
	);
};
