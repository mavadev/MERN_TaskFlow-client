import { NavLink } from 'react-router-dom';
import {
	BookmarkSquareIcon,
	KeyIcon,
	SwatchIcon,
	UserCircleIcon,
	WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const tabs = [
	{ title: 'Perfil Público', icon: <UserCircleIcon />, link: '/profile' },
	{ title: 'Cuenta', icon: <WrenchScrewdriverIcon />, link: '/account' },
	{ title: 'Autenticación', icon: <KeyIcon />, link: '/authentication' },
	{ title: 'Apariencia', icon: <SwatchIcon />, link: '/preferences' },
	{ title: 'Proyectos', icon: <BookmarkSquareIcon />, link: '/projects' },
];

const SettingsAside = () => {
	return (
		<aside className='w-full md:max-w-60 flex flex-col gap-5 md:border-r-2 md:border-primary'>
			<ul>
				<h3 className='p-4 pl-0 text-sm font-semibold uppercase text-gray-700 max-md:hidden'>Configuración</h3>
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
						<h3 className='text-sm'>{tab.title}</h3>
						<div className='size-5'>{tab.icon}</div>
					</NavLink>
				))}
			</ul>
		</aside>
	);
};

export default SettingsAside;
