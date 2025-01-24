import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useParams } from 'react-router-dom';

import { getProject } from '@/api/ProjectAPI';
import { useAuth } from '@/hooks/useAuth';
import { TaskList } from '@/components/app/tasks/TaskList';
import AddTaskModal from '@/components/app/tasks/modal/AddTaskModal';
import EditTaskModal from '@/components/app/tasks/modal/EditTaskModal';
import ViewTaskModal from '@/components/app/tasks/modal/ViewTaskModal';
import type { Project } from '@/interfaces/project.interface';

const ProjectDetailsPage = () => {
	const { user } = useAuth();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const {
		data: project,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject({ projectId }),
		retry: false,
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !project) return <Navigate to='/404' />;

	const isManager = user?._id === project.manager;

	return (
		<>
			<header className='flex flex-col gap-3 mb-5'>
				<div>
					<h2 className='uppercase font-bold text-gray-600'>{isManager ? 'Proyecto' : 'Colaboración'}</h2>
					<h1 className='font-bold text-2xl md:text-3xl'>{project.projectName}</h1>
				</div>
				<p className='text-lg text-gray-900 text-balance'>{project.description}</p>
				<p className='text-sm text-gray-600'>Cliente: {project.clientName}</p>
				{isManager && (
					<nav>
						<Link
							to='team'
							className='btn-primary mt-4'>
							Ver Equipo
						</Link>
					</nav>
				)}
			</header>
			<TaskList
				isManager={isManager}
				tasks={project.tasks}
			/>

			<AddTaskModal />
			<EditTaskModal />
			<ViewTaskModal />
		</>
	);
};

export default ProjectDetailsPage;
