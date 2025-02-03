import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';

import { getProjects } from '@/api/ProjectAPI';

const tabs = [
	{ title: 'Personales', link: '/app/projects/managed' },
	{ title: 'Colaboraciones', link: '/app/projects/team' },
];

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
			<header className='py-10 space-y-5 flex flex-col md:flex-row md:items-end justify-between'>
				<div>
					<h1 className='text-3xl font-bold'>Mis Proyectos</h1>
					<p className='text-2xl mt-2'>Administra tus proyectos</p>
				</div>
				<nav className='self-end'>
					<Link
						to='/app/projects/create'
						className='btn-primary px-4 py-2'>
						Crear Proyecto
					</Link>
				</nav>
			</header>

			<main>
				<div className='flex'>
					{tabs.map(tab => (
						<NavLink
							to={tab.link}
							className={({ isActive }) =>
								`w-full md:w-max py-4 px-8 text-center border-b-4 font-semibold text-sm uppercase ${
									isActive ? 'text-primary border-primary' : 'text-gray-700 border-gray-300'
								}`
							}>
							{tab.title}
						</NavLink>
					))}
				</div>
				<section className='p-4'>
					<Outlet context={{ ...projects }} />
				</section>
			</main>
		</>
	);
};

export default ProjectsPage;
