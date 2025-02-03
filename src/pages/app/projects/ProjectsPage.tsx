import { Outlet } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { ErrorScreen } from '@/components/ErrorScreen';
import type { ProjectsResponse } from '@/interfaces/project.interface';

interface ProjectsPageProps {
	projects: ProjectsResponse;
	isLoading: boolean;
	isError: boolean;
}

const ProjectsPage = ({ projects, isLoading, isError }: ProjectsPageProps) => {
	if (isLoading) return <Loading />;
	if (isError) return <ErrorScreen />;

	return <Outlet context={{ ...projects }} />;
};

export default ProjectsPage;
