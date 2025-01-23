import { ToastContainer } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Logo } from '@/components/LogoApp';
import { UserMenu } from '@/components/app/UserMenu';
import { useAuth } from '@/hooks/useAuth';

const AppLayout = () => {
	const { data, isLoading, isError } = useAuth();

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <Navigate to='/auth/login' />;

	return (
		<div className='flex flex-col min-h-screen'>
			<header className='bg-slate-800'>
				<div className='container mx-auto flex flex-row justify-between items-center px-4 py-6'>
					<Logo />
					<UserMenu name={data?.name!} />
				</div>
			</header>
			<main className='container mx-auto flex-1 px-4 py-8'>
				<ToastContainer
					draggable
					closeOnClick
				/>
				<Outlet />
			</main>
			<footer className='bg-slate-800'>
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
