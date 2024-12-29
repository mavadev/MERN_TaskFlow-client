import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';

export const NavMenu = () => {
	return (
		<Popover className='md:relative'>
			<PopoverButton className='leading-6 p-1 rounded bg-yellow-600'>
				<Bars3Icon className='w-8 h-8 text-white ' />
			</PopoverButton>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-200'
				enterFrom='opacity-0 translate-y-1'
				enterTo='opacity-100 translate-y-0'
				leave='transition ease-in duration-150'
				leaveFrom='opacity-100 translate-y-0'
				leaveTo='opacity-0 translate-y-1'>
				<PopoverPanel className='absolute right-0 z-10 mt-5 max-sm:p-5 max-md:bottom-0 max-md:left-0'>
					<div className='p-4 w-full md:w-56 shrink rounded-md bg-white text-sm font-semibold leading-6 text-gray-800 shadow-lg ring-1 ring-gray-900/5'>
						<p className='text-center'>Bienvenido,</p>
						<p className='text-center font-bold'>Usuario</p>
						<Link
							to='/profile'
							className='block p-2 hover:text-yellow-900'>
							Mi Perfil
						</Link>
						<Link
							to='/'
							className='block p-2 hover:text-yellow-900'>
							Mis Proyectos
						</Link>
						<button
							type='button'
							onClick={() => {}}
							className='block p-2 hover:text-yellow-900'>
							Cerrar Sesión
						</button>
					</div>
				</PopoverPanel>
			</Transition>
		</Popover>
	);
};
