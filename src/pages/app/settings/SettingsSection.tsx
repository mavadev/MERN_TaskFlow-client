import { Outlet } from 'react-router-dom';
import { User } from '@/interfaces/user.interface';
import { ProjectsResponseConfig } from '@/interfaces/project.interface';
import { Loading } from '@/components/Loading';

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
	if (isError) return <h2>Hubo un error al obtener la información</h2>;

	return (
		<section className='flex-1'>
			<Outlet context={{ profile, projects }} />
		</section>
	);
};

export default SettingsSection;
