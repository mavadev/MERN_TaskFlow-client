import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

import { TaskDraftData } from '@/interfaces';
import TaskForm from './TaskForm';

export default function AddTaskModal() {
	const navigate = useNavigate();
	const location = useLocation();
	const newTask = !!new URLSearchParams(location.search).get('newTask');

	const initialValues: TaskDraftData = {
		name: '',
		description: '',
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	// Petición API - POST

	const handleForm = (taskData: TaskDraftData) => console.log(taskData);

	return (
		<Transition
			appear
			as={Fragment}
			show={newTask}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={() => navigate(location.pathname)}>
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
							<DialogPanel className='w-full max-w-3xl transform overflow-hidden rounded-lg bg-white transition-all py-12 px-14 space-y-5'>
								<DialogTitle
									as='h3'
									className='font-bold text-3xl my-4'>
									Nueva Tarea
								</DialogTitle>
								<p className='text-xl '>
									Llena el formulario y crea <span className='text-yellow-600 font-bold'>una tarea</span>
								</p>
								<form
									noValidate
									className='space-y-5'
									onSubmit={handleSubmit(handleForm)}>
									<TaskForm
										errors={errors}
										register={register}
									/>
									<input
										type='submit'
										value='Añadir Tarea'
										className='btn-secondary p-4 w-full'
									/>
								</form>
							</DialogPanel>
						</TransitionChild>
					</div>
				</TransitionChild>
			</Dialog>
		</Transition>
	);
}
