import { ToastContainer } from 'react-toastify';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/LogoApp';

const AuthLayout = () => {
	const { isUserError, isUserLoading } = useAuth();

	if (isUserLoading) return <div>Cargando...</div>;
	if (!isUserError)
		return (
			<Navigate
				replace
				to='/app/projects/managed'
			/>
		);

	return (
		<div className='flex flex-col min-h-screen'>
			<main className='flex-1 flex flex-row'>
				<ToastContainer
					draggable
					closeOnClick
				/>
				<div className='flex-1 px-4 py-8 flex flex-col justify-center items-center gap-10 bg-surface'>
					<Logo />
					<Outlet />
				</div>
				<div className='hidden flex-1 bg-inverseSurface lg:block'></div>
			</main>
		</div>
	);
};

export default AuthLayout;
