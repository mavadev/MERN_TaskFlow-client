import { Fragment, PropsWithChildren } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';

export const OptionsMenu = ({ children }: PropsWithChildren) => {
	return (
		<Menu
			as='div'
			className='relative'>
			<MenuButton className='block text-gray-500 hover:text-gray-900'>
				<span className='sr-only'>Opciones de Proyecto</span>
				<EllipsisVerticalIcon
					aria-hidden='true'
					className='h-7 w-7'
				/>
			</MenuButton>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'>
				<MenuItems className='absolute right-0 z-10 mt-2 w-44 origin-top-right rounded bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none text-center select-none'>
					{children}
				</MenuItems>
			</Transition>
		</Menu>
	);
};
