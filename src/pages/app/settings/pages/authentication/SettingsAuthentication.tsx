import SettingsFormChangePassword from './SettingsFormChangePassword';

const SettingsAuthentication = () => {
	return (
		<main className='flex-1 p-5 overflow-auto bg-white'>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-2'>Cambiar contraseña</h2>
				<p className='text-sm text-gray-500 mb-5'>Cambia tu contraseña para mantener tu cuenta segura.</p>

				<SettingsFormChangePassword />
			</section>
		</main>
	);
};

export default SettingsAuthentication;
