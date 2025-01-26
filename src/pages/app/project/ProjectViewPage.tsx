import { Link } from 'react-router-dom';

import { useProject } from '../ProjectDetailsPage';
import { TaskList } from '@/components/app/tasks/TaskList';
import { TaskModal } from '@/components/app/tasks/TaskModal';

const ProjectViewPage = () => {
	const { user, project, team } = useProject();
	const isManager = user?._id === project.manager;

	return (
		<>
			<header className='flex flex-col gap-3 mb-5'>
				<p className='text-lg text-gray-900 text-balance'>{project.description}</p>
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

			{/* Modal de tarea */}
			<TaskModal team={team} />
		</>
	);
};

export default ProjectViewPage;
