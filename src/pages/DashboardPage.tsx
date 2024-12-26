import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/api/ProjectAPI';

const DashboardPage = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	console.log({ data, isLoading, isError, error });

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
		</>
	);
};

export default DashboardPage;
