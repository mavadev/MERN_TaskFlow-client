import { Outlet } from 'react-router-dom';
import { Logo } from '@/components/LogoApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserMenu } from '@/components/UserMenu';

const AppLayout = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='bg-slate-800'>
				<div className='container mx-auto flex flex-row justify-between items-center px-4 py-6'>
					<Logo />
					<UserMenu />
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
