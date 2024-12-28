import { useQuery } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

import { getProjects } from '@/api/ProjectAPI';
import { ProjectItem } from '@/components/ProjectItem';

const DashboardPage = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !data) return <Navigate to='/404' />;

	return (
		<>
			<header>
				<h1 className='title'>Mis Proyectos</h1>
				<p className='subtitle'>Administra tus proyectos</p>

				<nav>
					<Link
						to='/projects/create'
						className='btn-primary mt-4'>
						Nuevo Proyecto
					</Link>
				</nav>
			</header>

			{data?.length ? (
				<ul
					role='list'
					className='my-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
					{data.map(project => (
						<ProjectItem project={project} />
					))}
				</ul>
			) : (
				<div className='flex flex-col items-center text-2xl gap-3'>
					<DocumentTextIcon width={70} />
					<h2>No tienes ningún proyecto</h2>
				</div>
			)}
		</>
	);
};

export default DashboardPage;
