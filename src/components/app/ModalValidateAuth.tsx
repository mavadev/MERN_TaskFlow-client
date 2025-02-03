import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { Modal } from './modal/Modal';
import { checkPassword } from '@/api/SettingsAPI';
import type { FormCheckPassword } from '@/interfaces/settings.interface';

interface ModalSecurityProps {
	show: boolean;
	handleSuccess: () => void;
	handleClose: () => void;
}

const ModalValidateAuth = ({ show, handleSuccess, handleClose }: ModalSecurityProps) => {
	const { reset, register, handleSubmit } = useForm<FormCheckPassword>();

	const { mutate } = useMutation({
		mutationFn: checkPassword,
		onMutate: () => reset(),
		onError: () => handleClose(),
		onSuccess: () => handleSuccess(),
	});

	const handleCheckPassword = (formCheckPassword: FormCheckPassword) => mutate(formCheckPassword);

	return (
		<Modal
			show={show}
			handleOnClose={handleClose}>
			<main className='p-8 space-y-3'>
				<h2 className='text-2xl font-semibold'>Confirmar acceso </h2>
				<p className='text-gray-500 text-lg'>Para continuar, por favor ingresa tu contraseña.</p>
				<form
					className='flex flex-col gap-2'
					onSubmit={handleSubmit(handleCheckPassword)}>
					<input
						id='password'
						type='password'
						className='input-form'
						placeholder='Ingresa tu contraseña'
						{...register('password', {
							required: 'La contraseña es requerida',
						})}
					/>
					<button
						type='submit'
						className='btn-primary px-4 py-2'>
						Confirmar
					</button>
				</form>
			</main>
		</Modal>
	);
};

export default ModalValidateAuth;
