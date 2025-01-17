import { Fragment, PropsWithChildren } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';

interface TaskModalProps extends PropsWithChildren {
	show: boolean;
	handleOnClose: () => void;
}

export const TaskModal = ({ children, show, handleOnClose }: TaskModalProps) => {
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
							<DialogPanel className='w-11/12 max-w-3xl transform overflow-hidden rounded-lg bg-white transition-all p-10 md:px-14 space-y-5'>
								{children}
							</DialogPanel>
						</TransitionChild>
					</div>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
};
