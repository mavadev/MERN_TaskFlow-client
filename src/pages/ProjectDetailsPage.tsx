import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import type { Project } from '@/interfaces';
import { getProject } from '@/api/ProjectAPI';
import AddTaskModal from '@/components/tasks/modal/AddTaskModal';
import { TaskList } from '@/components/tasks/TaskList';
import EditTaskModal from '@/components/tasks/modal/EditTaskModal';

const ProjectDetailsPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const projectId = params.projectId as Project['_id'];

	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject({ projectId }),
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !data) return <Navigate to='/404' />;

	return (
		<>
			<header>
				<h2 className='uppercase font-bold text-gray-600 text-sm'>Proyecto</h2>
				<h1 className='font-bold text-2xl'>{data.projectName}</h1>
				<p className='text-lg mt-1 mb-3 text-gray-900 text-balance'>{data.description}</p>
				<p className='text-sm text-gray-600'>Cliente: {data.clientName}</p>
				<nav>
					<button
						type='button'
						className='btn-primary mt-3 select-none'
						onClick={() => navigate(location.pathname + '?newTask=true')}>
						Añadir Tarea
					</button>
				</nav>
			</header>
			<TaskList tasks={data.tasks} />
			<AddTaskModal projectId={projectId} />
			<EditTaskModal projectId={projectId} />
		</>
	);
};

export default ProjectDetailsPage;
