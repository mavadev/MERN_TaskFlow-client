import { useOutletContext } from 'react-router-dom';

import type { SettingsContext } from '../../SettingsSection';
import { SettingsFormProfile, SettingsAvatar, SettingsFormContribution } from '../profile';

const SettingsProfile = () => {
	const { profile } = useOutletContext<SettingsContext>();

	return (
		<main className='flex-1 space-y-10 p-5'>
			<section>
				<h2 className='text-xl font-semibold mb-3 border-b border-outline pb-2'>Perfil Público</h2>
				<div className='flex flex-col-reverse md:flex-row gap-5'>
					<SettingsFormProfile profile={profile} />
					<SettingsAvatar
						avatar={profile.avatar}
						username={profile.name}
					/>
				</div>
			</section>
			<section>
				<h2 className='text-xl font-semibold mb-3 border-b border-gray-300 pb-2'>Contribución en Proyectos</h2>
				<SettingsFormContribution profile={profile} />
			</section>
		</main>
	);
};

export default SettingsProfile;
