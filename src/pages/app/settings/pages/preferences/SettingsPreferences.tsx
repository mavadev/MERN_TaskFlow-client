import SettingsColorTheme from './SettingsColorTheme';
import SettingsTheme from './SettingsTheme';

const SettingsPreferences = () => {
	return (
		<main className='flex-1 p-5 space-y-10'>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-3'>Color Principal</h2>
				<p className='text-sm text-gray-500'>Elige el color principal de Task Flow.</p>
				<p className='text-sm text-gray-500'>Las selecciones se aplican inmediatamente y se guardarán en tu cuenta.</p>
				<SettingsColorTheme />
			</section>
			<section>
				<h2 className='text-xl font-semibold border-b border-gray-300 pb-2 mb-3'>Tema de la aplicación</h2>
				<p className='text-sm text-gray-500'>Elige el tema de la aplicación.</p>
				<p className='text-sm text-gray-500'>Las selecciones se aplican inmediatamente y se guardarán en tu cuenta.</p>
				<SettingsTheme />
			</section>
		</main>
	);
};

export default SettingsPreferences;
