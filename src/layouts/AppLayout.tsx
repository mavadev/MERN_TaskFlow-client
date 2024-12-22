import { Outlet } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { NavMenu } from '@/components/NavMenu';

const AppLayout = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<header className='bg-gray-200'>
				<div className='container mx-auto flex flex-row justify-between items-center px-4 py-8'>
					<Logo />
					<NavMenu />
				</div>
			</header>
			<main className='container mx-auto flex-1 p-4'>
				<Outlet />
			</main>
			<footer className='bg-black'>
				<div className='container mx-auto p-4'>
					<p className='text-center text-white'>Todos los derechos reservados &copy; {new Date().getFullYear()}</p>
				</div>
			</footer>
		</div>
	);
};

export default AppLayout;
