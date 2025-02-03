import { useOutletContext } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

import { ProjectItem } from '@/components/app/projects/ProjectItem';
import type { ProjectSimple } from '@/interfaces/project.interface';

const ProjectsCollaborative = () => {
	const { teamProjects }: { teamProjects: ProjectSimple[] } = useOutletContext();

	if (!teamProjects.length)
		return (
			<div className='flex flex-col items-center text-2xl gap-3 my-10'>
				<DocumentTextIcon width={50} />
				<h2>No tienes proyectos colaborados</h2>
			</div>
		);

	return (
		<>
			<h3 className='text-right mb-5 text-xl text-black'>Proyectos Colaborados: {teamProjects.length}</h3>
			<ul
				role='list'
				className='mb-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
				{teamProjects.map(project => (
					<ProjectItem
						key={project._id}
						project={project}
						type='team'
					/>
				))}
			</ul>
		</>
	);
};

export default ProjectsCollaborative;
