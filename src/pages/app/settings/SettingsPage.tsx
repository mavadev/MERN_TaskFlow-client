import { Navigate, NavLink, Outlet } from 'react-router-dom';
import {
	BookmarkSquareIcon,
	KeyIcon,
	SwatchIcon,
	UserCircleIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

import { useProfile } from '@/hooks/useProfile';
import { ProfileContext } from './SettingsContext';

const tabs = [
	{ title: 'Perfil Público', icon: <UserCircleIcon />, link: '/profile' },
	{ title: 'Cuenta', icon: <WrenchScrewdriverIcon />, link: '/account' },
	{ title: 'Autenticación', icon: <KeyIcon />, link: '/authentication' },
	{ title: 'Apariencia', icon: <SwatchIcon />, link: '/preferences' },
	{ title: 'Proyectos', icon: <BookmarkSquareIcon />, link: '/projects' },
];

const SettingsPage = () => {
	const { profile, isProfileLoading, isProfileError } = useProfile();

	if (isProfileLoading) return <p>Cargando perfil ...</p>;
	if (isProfileError || !profile) return <Navigate to='/app/404' />;

	return (
		<ProfileContext.Provider value={{ profile }}>
			<div className='container flex flex-col md:flex-row flex-1'>
				<aside className='w-full md:max-w-max flex flex-col justify-end gap-5 border-r-2 border-gray-300'>
					<h2 className='text-xl uppercase text-gray-700 p-2 hidden md:block'>Configuración</h2>
					<ul>
						{tabs.map(tab => (
							<NavLink
								key={tab.title}
								to={`/app/settings${tab.link}`}
								className={({ isActive }) =>
									`p-4 flex items-center justify-between ${
										isActive
											? 'border-l-4 border-primary-700 text-primary-700 bg-primary-200'
											: 'text-gray-500 hover:bg-gray-100'
									}`
								}>
								<h3 className='text-sm pr-20'>{tab.title}</h3>
								<div className='size-5'>{tab.icon}</div>
							</NavLink>
						))}
					</ul>
				</aside>
				<Outlet />
			</div>
		</ProfileContext.Provider>
	);
};

export default SettingsPage;
