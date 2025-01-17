import { Logo } from '@/components/LogoApp';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<ToastContainer
				draggable
				closeOnClick
			/>
			<main className='container mx-auto flex-1 px-4 py-8 grid place-content-center'>
				<Logo />
				<Outlet />
			</main>
		</div>
	);
};

export default AuthLayout;
