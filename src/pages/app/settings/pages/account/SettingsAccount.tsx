import { useNavigate, useOutletContext } from 'react-router-dom';

import type { SettingsContext } from '../../SettingsSection';
import { ModalSettingsUsername, ModalSettingsDeleteAccount } from '../account';

const SettingsAccount = () => {
	const navigate = useNavigate();
	const { profile, projects } = useOutletContext<SettingsContext>();

	const openModalUsername = () => {
		navigate('?change-username=true');
	};

	const openModalDeleteAccount = () => {
		navigate('?delete-account=true');
	};

	return (
		<main className='flex-1 p-5 space-y-10'>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-2'>Nombre de usuario</h2>
				<p className='text-sm text-gray-500 my-3'>
					Cambia el nombre de usuario de tu cuenta, este nombre se mostrará en tu perfil público.
				</p>
				<button
					onClick={openModalUsername}
					className='btn-primary px-4 py-2 w-full md:w-max !bg-tertiary'>
					Cambiar usuario
				</button>
			</section>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-2'>Eliminar cuenta</h2>
				<p className='text-sm text-gray-500 my-3'>
					Elimina tu cuenta de manera permanente, esto eliminará todos los datos de tu cuenta.
				</p>
				<button
					onClick={openModalDeleteAccount}
					className='btn-primary px-4 py-2 w-full md:w-max !bg-error'>
					Eliminar cuenta
				</button>
			</section>

			<ModalSettingsUsername />
			<ModalSettingsDeleteAccount
				email={profile.email}
				projects={projects.managedProjects.length}
			/>
		</main>
	);
};

export default SettingsAccount;
