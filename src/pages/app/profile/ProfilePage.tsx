import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';

import { getProfile } from '@/api/UserAPI';
import { ProfileContext } from './ProfileContext';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const tabs = [
	{ title: 'Perfil de Usuario', icon: <UserCircleIcon />, link: '/' },
	{ title: 'Cambiar Contraseña', icon: <UserCircleIcon />, link: '/change-password' },
];

const ProfilePage = () => {
	// Obtener usuario completo
	const {
		data: profile,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		retry: false,
	});

	if (isLoading) return <p>Cargando perfil ...</p>;
	if (isError || !profile) return <Navigate to='/app/404' />;

	return (
		<ProfileContext.Provider value={{ profile }}>
			<header className='container p-5 pb-0'>
				<h2 className='text-2xl font-semibold mb-10'>Configuración de Perfil</h2>
				{tabs.map(tab => (
					<NavLink
						to={tab.link}
						className={({ isActive }) =>
							`px-4 py-2 text-xl font-semibold flex gap-2 items-center ${
								isActive ? 'text-primary-700 border-b-2 border-primary-700' : 'text-gray-500'
							}`
						}>
						{tab.icon}
						<h3>{tab.title}</h3>
					</NavLink>
				))}
			</header>
			<Outlet />
		</ProfileContext.Provider>
	);
};

export default ProfilePage;
