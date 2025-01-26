import { Fragment, PropsWithChildren } from 'react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItems, Transition } from '@headlessui/react';

export const OptionsItem = ({ children }: PropsWithChildren) => {
	return (
		<Menu
			as='div'
			className='relative'>
			<MenuButton className='block text-white hover:text-gray-200'>
				<span className='sr-only'>Opciones</span>
				<EllipsisVerticalIcon
					aria-hidden='true'
					className='h-6 w-6 text-gray-500'
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
				<MenuItems className='absolute right-0 z-10 mt-2 w-44 rounded bg-white  shadow-lg select-none text-center overflow-hidden'>
					{children}
				</MenuItems>
			</Transition>
		</Menu>
	);
};
