import { useOutletContext } from 'react-router-dom';
import { UserGroupIcon } from '@heroicons/react/24/outline';

import { ProjectItem } from '@/components/app/projects/ProjectItem';
import type { ProjectSimple } from '@/interfaces/project.interface';

const ProjectsCollaborative = () => {
	const { teamProjects }: { teamProjects: ProjectSimple[] } = useOutletContext();

	if (!teamProjects.length)
		return (
			<div className='flex flex-col gap-8 items-center text-center my-10'>
				<UserGroupIcon width={50} />
				<h2 className='text-xl font-semibold'>No tienes proyectos colaborados</h2>
				<p className='text-lg'>Solicita a tus compañeros de equipo que te inviten a alguno de sus proyectos.</p>
			</div>
		);

	return (
		<ul
			role='list'
			className='mb-10 flex flex-wrap gap-5'>
			{teamProjects.map(project => (
				<ProjectItem
					type='team'
					key={project._id}
					project={project}
				/>
			))}
		</ul>
	);
};

export default ProjectsCollaborative;
