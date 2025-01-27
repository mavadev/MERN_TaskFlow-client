import { useQuery } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

import { getProjects } from '@/api/ProjectAPI';
import { ProjectItem } from '@/components/app/projects/ProjectItem';

const ProjectsPage = () => {
	const {
		data: projects,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !projects) return <Navigate to='/404' />;

	return (
		<>
			<header>
				<h1 className='title'>Mis Proyectos</h1>
				<p className='subtitle'>Administra tus proyectos</p>

				<nav>
					<Link
						to='/app/projects/create'
						className='btn-primary mt-4'>
						Nuevo Proyecto
					</Link>
				</nav>
			</header>

			{projects.managedProjects.length ? (
				<>
					<h3 className='text-right mb-5 text-xl text-black'>Proyectos: {projects.managedProjects.length}</h3>
					<ul
						role='list'
						className='mb-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
						{projects.managedProjects.map(project => (
							<ProjectItem
								key={project._id}
								project={project}
								type='managed'
							/>
						))}
					</ul>
				</>
			) : (
				<div className='flex flex-col items-center text-2xl gap-3 my-10'>
					<DocumentTextIcon width={50} />
					<h2>No tienes proyectos</h2>
				</div>
			)}
			{projects.teamProjects.length ? (
				<>
					<h3 className='text-right mb-5 text-xl text-black'>Proyectos Colaborados: {projects.teamProjects.length}</h3>
					<ul
						role='list'
						className='mb-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
						{projects.teamProjects.map(project => (
							<ProjectItem
								key={project._id}
								project={project}
								type='team'
							/>
						))}
					</ul>
				</>
			) : (
				<div className='flex flex-col items-center text-2xl gap-3 my-10'>
					<DocumentTextIcon width={50} />
					<h2>No tienes proyectos colaborados</h2>
				</div>
			)}
		</>
	);
};

export default ProjectsPage;
