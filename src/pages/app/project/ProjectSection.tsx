import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

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
	const navigate = useNavigate();
	const location = useLocation();

	if (isProjectLoading)
		return (
			<div className='min-h-40 flex-1 flex'>
				<Loading />
			</div>
		);

	const team: TeamResponse = {
		manager: project.manager,
		team: project.team,
	};

	const handleCreateTask = () => navigate(location.pathname + '?mode=create');
	const handleFindMember = () => navigate(location.pathname + '?addMember=true');

	return (
		<main className='relative flex-1 flex overflow-auto'>
			<section className='flex-1 overflow-auto p-4'>
				<Outlet context={{ project, team, isManager }} />
			</section>
			<div className='absolute right-10 bottom-10 flex gap-3 max-md:hidden'>
				{location.pathname.includes('/tasks') && (
					<button
						onClick={handleCreateTask}
						className='size-16 text-onPrimary p-5 bg-primary rounded-full hover:opacity-90'>
						<PlusIcon />
					</button>
				)}
				{location.pathname.includes('/team') && (
					<button
						onClick={handleFindMember}
						className='size-16 text-onSecondary p-5 bg-secondary rounded-full hover:opacity-90'>
						<MagnifyingGlassIcon />
					</button>
				)}
			</div>
		</main>
	);
};

export default ProjectSection;
