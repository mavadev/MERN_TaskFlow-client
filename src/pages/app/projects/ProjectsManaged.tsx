import { Link, useOutletContext } from 'react-router-dom';
import { RectangleGroupIcon } from '@heroicons/react/24/outline';

import { ProjectItem } from '@/components/app/projects/ProjectItem';
import type { ProjectSimple } from '@/interfaces/project.interface';

const ProjectsManaged = () => {
	const { managedProjects }: { managedProjects: ProjectSimple[] } = useOutletContext();

	if (!managedProjects.length)
		return (
			<div className='flex flex-col gap-8 items-center text-center my-10'>
				<RectangleGroupIcon width={50} />
				<h2 className='text-xl font-semibold'>No tienes proyectos personales</h2>
				<p className='text-lg'>Crea uno nuevo para empezar a trabajar en él.</p>
				<Link
					to='/app/projects/create'
					className='btn-primary px-4 py-2'>
					Crear Nuevo Proyecto
				</Link>
			</div>
		);

	return (
		<ul
			role='list'
			className='mb-10 flex flex-wrap gap-5'>
			{managedProjects.map(project => (
				<ProjectItem
					type='managed'
					key={project._id}
					project={project}
				/>
			))}
		</ul>
	);
};

export default ProjectsManaged;
