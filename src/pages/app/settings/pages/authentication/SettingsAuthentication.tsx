import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { changePasswordProfile } from '@/api/SettingsAPI';
import SettingsFormChangePassword from './SettingsFormChangePassword';
import type { FormChangePassword } from '@/interfaces/settings.interface';

const SettingsAuthentication = () => {
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
	// Cambiar Contraseña
	const handleChangePassword = (formChangePassword: FormChangePassword) => {
		mutate({ formChangePassword });
	};

	return (
		<main className='flex-1 p-5 overflow-auto bg-white'>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-2'>Cambiar contraseña</h2>
				<p className='text-sm text-gray-500 mb-5'>Cambia tu contraseña para mantener tu cuenta segura.</p>

				<SettingsFormChangePassword
					onSubmit={handleChangePassword}
					isPending={isPending}
				/>
			</section>
		</main>
	);
};

export default SettingsAuthentication;
