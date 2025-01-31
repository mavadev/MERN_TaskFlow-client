import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { updateUsername } from '@/api/SettingsAPI';
import { Modal } from '@/components/app/modal/Modal';
import type { FormUsername } from '@/interfaces/settings.interface';

const ModalSettingsUsername = () => {
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<FormUsername>();

	const [searchParams] = useSearchParams();
	const isOpen = searchParams.get('change-username');

	const { mutate } = useMutation({
		mutationFn: updateUsername,
		onSuccess: message => {
			toast.success(message);
			navigate(-1);
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleUpdateUsername = (formUsername: FormUsername) => mutate(formUsername);
	const handleOnClose = () => navigate(-1);

	return (
		<Modal
			show={!!isOpen}
			handleOnClose={handleOnClose}>
			<header>
				<h3 className='font-semibold p-5 text-lg text-gray-900 border-b border-gray-300'>
					Ingresa un nuevo nombre de usuario
				</h3>
			</header>
			<main>
				<form
					className='space-y-5 p-5'
					onSubmit={handleSubmit(handleUpdateUsername)}>
					<div className='flex flex-col gap-1'>
						<input
							type='text'
							id='username'
							className='input-form text-sm'
							{...register('username', {
								required: 'El nombre de usuario es requerido',
							})}
						/>
						<label
							htmlFor='username'
							className='text-sm text-gray-500'>
							Elige un nombre de usuario
						</label>
					</div>
					<button
						type='submit'
						className='btn btn-primary w-full'>
						Cambiar nombre de usuario
					</button>
				</form>
			</main>
		</Modal>
	);
};

export default ModalSettingsUsername;
