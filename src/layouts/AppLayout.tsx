import { ToastContainer } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/LogoApp';
import { MenuUser } from '@/components/app/MenuUser';

const AppLayout = () => {
	const { user, isUserLoading, isUserError } = useAuth();

	if (isUserLoading) return <div>Cargando...</div>;
	if (isUserError)
		return (
			<Navigate
				replace
				to='/auth/login'
			/>
		);

	return (
		<div className='flex flex-col min-h-screen h-screen bg-background'>
			<header className='border-b-2 border-secondary'>
				<div className='container mx-auto flex justify-between py-6 px-3'>
					<Logo />
					<MenuUser name={user?.name!} />
				</div>
			</header>
			<main className='mx-auto w-full flex-1 flex flex-col'>
				<ToastContainer
					draggable
					closeOnClick
				/>
				<Outlet />
			</main>
			<footer className='bg-primary'>
				<div className='container mx-auto p-8 flex flex-col md:flex-row items-center justify-between text-onSurface'>
					<p className='text-onSecondary'>
						Proyecto realizado por{' '}
						<a
							target='_blank'
							rel='noopener noreferrer'
							href='https://github.com/mavadev'
							className='text-onSecondary font-semibold'>
							mavadev
						</a>
					</p>
					<p className='text-onSecondary'>Todos los derechos reservados &copy;{new Date().getFullYear()}</p>
				</div>
			</footer>
		</div>
	);
};

export default AppLayout;
