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
