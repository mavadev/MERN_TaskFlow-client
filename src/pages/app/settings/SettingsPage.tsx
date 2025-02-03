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
	const { profile, projects, isProfileLoading, isProfileError } = useProfile();

	if (isProfileLoading) return <p>Cargando perfil ...</p>;
	if (isProfileError || !profile) return <Navigate to='/app/404' />;

	return (
		<ProfileContext.Provider value={{ profile, projects }}>
			<div className='container flex flex-col md:flex-row flex-1'>
				<aside className='w-full md:max-w-max flex flex-col gap-5 border-r-2 border-primary'>
					<ul>
						<h3 className='p-4 pl-0 text-sm font-semibold uppercase text-gray-700'>Configuración</h3>
						{tabs.map(tab => (
							<NavLink
								key={tab.title}
								to={`/app/settings${tab.link}`}
								className={({ isActive }) =>
									`p-4 flex items-center justify-between border-l-4 ${
										isActive
											? 'border-primary text-primary bg-inversePrimary'
											: 'border-transparent text-gray-500 hover:opacity-80'
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
