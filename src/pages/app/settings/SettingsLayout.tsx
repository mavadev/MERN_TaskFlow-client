import { useQuery } from '@tanstack/react-query';

import SettingsSection from './SettingsSection';
import { useProfile } from '@/hooks/useProfile';
import { getProjectsConfig } from '@/api/ProjectAPI';
import SettingsAside from './SettingsAside';

const SettingsLayout = () => {
	const { profile, isProfileLoading, isProfileError } = useProfile();

	const {
		data: projects,
		isError: isProjectsError,
		isLoading: isProjectsLoading,
	} = useQuery({
		queryKey: ['projects-config'],
		queryFn: getProjectsConfig,
	});

	const isLoading = isProfileLoading || isProjectsLoading;
	const isError = isProfileError || isProjectsError;

	return (
		<main className='flex flex-col md:flex-row container mx-auto'>
			<SettingsAside />
			<SettingsSection
				profile={profile!}
				projects={projects!}
				isLoading={isLoading}
				isError={isError}
			/>
		</main>
	);
};

export default SettingsLayout;
