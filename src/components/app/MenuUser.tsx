import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { useQueryClient } from '@tanstack/react-query';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';

interface MenuUserProps {
	name: string;
}

export const MenuUser = ({ name }: MenuUserProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const logout = () => {
		localStorage.removeItem('AUTH_TOKEN');
		queryClient.removeQueries({ queryKey: ['user'] });
		navigate('/auth/login');
	};

	return (
		<Popover className='md:relative'>
			<PopoverButton className='block mt-auto'>
				<Bars3Icon className='w-8 h-8 text-secondary ' />
			</PopoverButton>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-200'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-150'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'>
				<div className='fixed md:absolute max-md:inset-0 md:right-0 z-10 max-md:bg-black/50 p-3 pb-5 md:pr-0 flex items-end'>
					<PopoverPanel className='w-full'>
						<div className='p-4 md:w-56 rounded-lg bg-surfaceContainerLow border-2 border-outline'>
							<header className='px-2 pb-4 border-b-2 border-outline mb-4'>
								<p className='text-lg md:text-sm'>Bienvenido,</p>
								<p className='text-xl md:text-sm font-semibold text-primary'>{name}</p>
							</header>
							<div className='text-left md:text-xs font-semibold uppercase flex flex-col transition-colors'>
								<Link
									to='/app/profile'
									className='p-2 w-full  hover:text-secondary'>
									Mi Perfil
								</Link>
								<Link
									to='/app/projects'
									className='p-2 w-full hover:text-secondary'>
									Mis Proyectos
								</Link>
								<Link
									to='/app/settings'
									className='p-2 w-full hover:text-secondary'>
									Configuración
								</Link>
								<button
									type='button'
									onClick={logout}
									className='p-2 w-max md:text-xs font-semibold uppercase hover:text-secondary'>
									Cerrar Sesión
								</button>
							</div>
						</div>
					</PopoverPanel>
				</div>
			</Transition>
		</Popover>
	);
};
