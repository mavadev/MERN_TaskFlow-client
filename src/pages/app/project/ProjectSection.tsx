import { Outlet } from 'react-router-dom';

import { Loading } from '@/components/Loading';
import type { Project } from '@/interfaces/project.interface';
import type { TeamResponse } from '@/interfaces/team.interface';

export interface ProjectContextProps {
	project: Project;
	team: TeamResponse;
	isManager: boolean;
}

interface ProjectSectionProps {
	isManager: boolean;
	project: Project;
	isProjectLoading: boolean;
}

const ProjectSection = ({ isManager, project, isProjectLoading }: ProjectSectionProps) => {
	if (isProjectLoading) return <Loading />;

	const team: TeamResponse = {
		manager: project.manager,
		team: project.team,
	};

	return (
		<main className='flex-1 overflow-auto p-4 '>
			<Outlet context={{ project, team, isManager }} />
		</main>
	);
};

export default ProjectSection;
