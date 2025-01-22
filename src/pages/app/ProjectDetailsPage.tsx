import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import { getProject } from '@/api/ProjectAPI';
import { TaskList } from '@/components/app/tasks/TaskList';
import AddTaskModal from '@/components/app/tasks/modal/AddTaskModal';
import EditTaskModal from '@/components/app/tasks/modal/EditTaskModal';
import ViewTaskModal from '@/components/app/tasks/modal/ViewTaskModal';

import type { Project } from '@/interfaces/project.interface';

const ProjectDetailsPage = () => {
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const { data, isLoading, isError } = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject({ projectId }),
	});

	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !data) return <Navigate to='/404' />;

	return (
		<>
			<header className='flex flex-col gap-3 mb-5'>
				<div>
					<h2 className='uppercase font-bold text-gray-600'>Proyecto</h2>
					<h1 className='font-bold text-2xl md:text-3xl'>{data.projectName}</h1>
				</div>
				<p className='text-lg text-gray-900 text-balance'>{data.description}</p>
				<p className='text-sm text-gray-600'>Cliente: {data.clientName}</p>
			</header>
			<TaskList tasks={data.tasks} />

			<AddTaskModal />
			<EditTaskModal />
			<ViewTaskModal />
		</>
	);
};

export default ProjectDetailsPage;
