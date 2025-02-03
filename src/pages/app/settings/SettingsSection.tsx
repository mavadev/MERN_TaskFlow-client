import { Outlet } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import { ErrorScreen } from '@/components/ErrorScreen';
import type { User } from '@/interfaces/user.interface';
import type { ProjectsResponseConfig } from '@/interfaces/project.interface';

interface SettingsPageProps {
	profile: User;
	projects: ProjectsResponseConfig;
	isLoading: boolean;
	isError: boolean;
}

export interface SettingsContext {
	profile: User;
	projects: ProjectsResponseConfig;
}

const SettingsSection = ({ profile, projects, isLoading, isError }: SettingsPageProps) => {
	if (isLoading) return <Loading />;
	if (isError) return <ErrorScreen />;

	return (
		<section className='flex-1'>
			<Outlet context={{ profile, projects }} />
		</section>
	);
};

export default SettingsSection;
