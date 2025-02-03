import { Outlet } from 'react-router-dom';
import { ProjectsResponse } from '@/interfaces/project.interface';
import { Loading } from '@/components/Loading';

interface ProjectsPageProps {
	projects: ProjectsResponse;
	isLoading: boolean;
	isError: boolean;
}

const ProjectsPage = ({ projects, isLoading, isError }: ProjectsPageProps) => {
	if (isLoading) return <Loading />;
	if (isError) return <h2 className='text-xl text-center text-error py-10'>Hubo un error al obtener los proyectos</h2>;

	return <Outlet context={{ ...projects }} />;
};

export default ProjectsPage;
