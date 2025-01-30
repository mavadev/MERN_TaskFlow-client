import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { changePasswordProfile } from '@/api/UserAPI';
import { FormChangePassword } from '@/interfaces/user.interface';
import SettingsFormChangePassword from './SettingsFormChangePassword';
import { useState } from 'react';

const SettingsAuthentication = () => {
	const [isChangePassword, setIsChangePassword] = useState(false);

	// Mutación para cambiar contraseña
	const { mutate, isPending } = useMutation({
		mutationFn: changePasswordProfile,
		onSuccess: message => {
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	// Mostrar formulario de cambio de contraseña
	const handleViewChangePassword = () => {
		setIsChangePassword(!isChangePassword);
	};

	// Cambiar Contraseña
	const handleChangePassword = (formData: FormChangePassword) => {
		mutate({ formChangePassword: formData });
	};

	return (
		<main className='flex-1 p-5 overflow-auto bg-white'>
			<section>
				<header className='flex justify-between items-center border-b border-gray-300 pb-2 mb-5'>
					<h2 className='text-xl font-semibold'>Contraseña</h2>
					<button
						onClick={handleViewChangePassword}
						className='btn btn-secondary text-sm px-4 py-2'>
						{isChangePassword ? 'Ocultar' : 'Cambiar Contraseña'}
					</button>
				</header>
				{isChangePassword ? (
					<SettingsFormChangePassword
						onSubmit={handleChangePassword}
						isPending={isPending}
					/>
				) : (
					<p className='text-sm text-gray-500'>Cambia tu contraseña para mantener tu cuenta segura.</p>
				)}
			</section>
		</main>
	);
};

export default SettingsAuthentication;
