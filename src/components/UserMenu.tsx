import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';

export const UserMenu = () => {
	return (
		<Popover className='md:relative'>
			<PopoverButton className='leading-6 p-1 rounded bg-primary-600'>
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
				<div className='fixed md:absolute max-md:inset-0 md:right-0 z-10 max-md:bg-black/50 p-5 md:pr-0 flex items-end'>
					<PopoverPanel className='w-full'>
						<div className='mt-auto p-4 md:w-56 shrink rounded bg-card text-sm font-semibold leading-6 text-gray-800 shadow-lg text-center'>
							<p className='max-md:text-lg'>Bienvenido,</p>
							<p className='max-md:text-xl font-bold text-primary-700 mb-3'>Gianmarco Chistama</p>
							<div className='text-left transition-colors max-md:text-lg font-medium'>
								<Link
									to='/profile'
									className='block p-2 border-b-2 w-full hover:border-b-darken-500 '>
									Mi Perfil
								</Link>
								<Link
									to='/'
									className='block p-2 border-b-2 w-full hover:border-b-darken-500'>
									Mis Proyectos
								</Link>
								<button
									type='button'
									onClick={() => {}}
									className='block p-2 border-b-2 w-full hover:border-b-darken-500 text-left'>
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
