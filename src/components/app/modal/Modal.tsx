import { Fragment, PropsWithChildren } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

interface ModalProps extends PropsWithChildren {
	show: boolean;
	handleOnClose: () => void;
}

export const Modal = ({ children, show, handleOnClose }: ModalProps) => {
	return (
		<Transition
			appear
			as={Fragment}
			show={show}>
			<Dialog
				as='div'
				onClose={handleOnClose}
				className='relative z-10'>
				<TransitionChild
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black/40 grid min-h-svh place-items-center'>
						<TransitionChild
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'>
							<DialogPanel className='w-11/12 max-w-xl overflow-hidden rounded bg-white transition-all'>
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
};
