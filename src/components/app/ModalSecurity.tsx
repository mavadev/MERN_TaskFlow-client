import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Modal } from './modal/Modal';
import { checkPassword } from '@/api/SettingsAPI';
import type { FormCheckPassword } from '@/interfaces/settings.interface';

interface ModalSecurityProps {
	show: boolean;
	handleSuccess: () => void;
}

const ModalSecurity = ({ show, handleSuccess }: ModalSecurityProps) => {
	const navigate = useNavigate();

	const { reset, register, handleSubmit } = useForm<FormCheckPassword>();

	const { mutate } = useMutation({
		mutationFn: checkPassword,
		onSuccess: () => {
			reset();
			handleSuccess();
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleCheckPassword = (formCheckPassword: FormCheckPassword) => mutate(formCheckPassword);
	const handleOnClose = () => navigate(-1);

	return (
		<Modal
			show={show}
			handleOnClose={handleOnClose}>
			<main className='p-4 space-y-3'>
				<h2 className='text-2xl font-semibold'>Confirmar acceso </h2>
				<p className='text-gray-500 text-lg'>Para continuar, por favor ingresa tu contraseña.</p>
				<form
					className='flex flex-col gap-2'
					onSubmit={handleSubmit(handleCheckPassword)}>
					<input
						id='password'
						type='password'
						className='input-form'
						{...register('password', {
							required: 'La contraseña es requerida',
						})}
					/>
					<button
						type='submit'
						className='btn-primary'>
						Confirmar
					</button>
				</form>
			</main>
		</Modal>
	);
};

export default ModalSecurity;
