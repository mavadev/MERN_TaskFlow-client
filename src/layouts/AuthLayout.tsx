import { Logo } from '@/components/LogoApp';
import { ToastContainer } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const AuthLayout = () => {
	const { data } = useAuth();
	if (data) return <Navigate to='/' />

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 flex flex-row '>
				<ToastContainer
					draggable
					closeOnClick
				/>
				<div className='flex-1 px-4 py-8 flex flex-col justify-center items-center gap-10'>
					<Logo />
					<Outlet />
				</div>
				<div className='hidden flex-1 bg-gray-600 lg:block'></div>
			</main>
		</div>
	);
};

export default AuthLayout;
