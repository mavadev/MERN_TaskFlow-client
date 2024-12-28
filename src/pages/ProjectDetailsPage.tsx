import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import type { Project } from '@/interfaces';
import { getProject } from '@/api/ProjectAPI';
import AddTaskModal from '@/components/tasks/AddTaskModal';

const ProjectDetailsPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const projectId = params.projectId as Project['_id'];

	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject(projectId),
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !data) return <Navigate to='/404' />;

	return (
		<>
			<header className='mb-5'>
				<h2 className='uppercase font-bold text-gray-500'>Proyecto</h2>
				<h1 className='uppercase font-bold text-3xl'>{data.projectName}</h1>
				<p className='text-xl mt-3 '>
					<span className='font-bold text-gray-800'>Cliente:</span> {data.clientName}
				</p>
			</header>
			<main className='space-y-1'>
				<p className='text-xl text-gray-900'>{data.description}</p>
				<nav>
					<button
						type='button'
						className='btn-primary mt-4 select-none'
						onClick={() => navigate(location.pathname + '?newTask=true')}>
						Añadir Tarea
					</button>
				</nav>
			</main>

			<AddTaskModal />
		</>
	);
};

export default ProjectDetailsPage;
