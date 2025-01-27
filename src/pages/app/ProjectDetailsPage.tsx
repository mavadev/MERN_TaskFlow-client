import { useQuery } from '@tanstack/react-query';
import { useContext, createContext } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import { getProject } from '@/api/ProjectAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TeamResponse } from '@/interfaces/team.interface';

interface ProjectContextType {
	project: Project;
	team: TeamResponse;
	isManager: boolean;
}

const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);
export const useProject = () => useContext(ProjectContext);

const ProjectDetailsPage = () => {
	const { user, isError: userError } = useAuth();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const {
		data: project,
		isLoading,
		isError: projectError,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject({ projectId }),
		retry: false,
	});

	if (isLoading) return <h2>Cargando Proyecto...</h2>;
	if (projectError || !project || !user || userError)
		return (
			<Navigate
				to='/app/404'
				replace
			/>
		);

	const isManager = user?._id === project.manager._id;
	const team: TeamResponse = {
		manager: project.manager,
		team: project.team,
	};

	return (
		<ProjectContext.Provider value={{ project, team, isManager }}>
			<header className='flex flex-col mb-5'>
				<h2 className='uppercase font-bold text-gray-600'>{isManager ? 'Proyecto' : 'Colaboración'}</h2>
				<h1 className='font-bold text-2xl md:text-3xl text-balance'>{project.projectName}</h1>
				<p className='text-sm text-gray-600 mt-2'>Cliente: {project.clientName}</p>
			</header>
			<Outlet />
		</ProjectContext.Provider>
	);
};

export default ProjectDetailsPage;
