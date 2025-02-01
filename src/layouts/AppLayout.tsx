import { ToastContainer } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/LogoApp';
import { MenuUser } from '@/components/app/MenuUser';

const AppLayout = () => {
	const { user, isLoading, isError } = useAuth();

	if (isLoading) return <div>Cargando...</div>;
	if (isError)
		return (
			<Navigate
				replace
				to='/auth/login'
			/>
		);

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='border-b border-gray-300'>
				<div className='container mx-auto flex flex-row justify-between items-center px-4 py-6'>
					<Logo />
					<MenuUser name={user?.name!} />
				</div>
			</header>
			<main className='container mx-auto flex-1 flex flex-col'>
				<ToastContainer
					draggable
					closeOnClick
				/>
				<Outlet />
			</main>
			<footer className='bg-primary-900'>
				<div className='container mx-auto p-5 pb-8 flex flex-col md:flex-row items-center justify-between text-gray-300'>
					<p>
						Proyecto realizado por{' '}
						<a
							target='_blank'
							className='text-primary-400'
							rel='noopener noreferrer'
							href='https://github.com/mavadev'>
							mavadev
						</a>
					</p>
					<p>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
				</div>
			</footer>
		</div>
	);
};

export default AppLayout;
