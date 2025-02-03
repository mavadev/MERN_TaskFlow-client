import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';

import { getProjects } from '@/api/ProjectAPI';
import ProjectsPage from './projects/ProjectsPage';

const tabs = [
	{ title: 'Personales', link: '/app/projects/managed' },
	{ title: 'Colaboraciones', link: '/app/projects/team' },
];

const ProjectsLayout = () => {
	const {
		data: projects,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	return (
		<>
			<header className='py-10 space-y-5 flex flex-col md:flex-row md:items-end justify-between'>
				<div className='max-md:text-center'>
					<h1 className='text-3xl font-bold'>Mis Proyectos</h1>
					<p className='text-2xl mt-2'>Administra tus proyectos</p>
				</div>
				<nav className='self-center'>
					<Link
						to='/app/projects/create'
						className='btn-primary px-4 py-2'>
						Crear Proyecto
					</Link>
				</nav>
			</header>

			<main className='flex-1 flex flex-col'>
				<div className='flex'>
					{tabs.map((tab, index) => (
						<NavLink
							key={index}
							to={tab.link}
							className={({ isActive }) =>
								`w-full md:w-max py-4 px-8 text-center border-b-4 font-semibold text-sm uppercase ${
									isActive ? 'text-primary border-primary' : 'opacity-70'
								}`
							}>
							{tab.title}
						</NavLink>
					))}
				</div>
				<section className='px-4 py-10 flex-1 flex flex-col'>
					<ProjectsPage
						isError={isError}
						projects={projects!}
						isLoading={isLoading}
					/>
				</section>
			</main>
		</>
	);
};

export default ProjectsLayout;
