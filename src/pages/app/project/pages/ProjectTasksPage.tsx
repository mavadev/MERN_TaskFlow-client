import { useOutletContext } from 'react-router-dom';

import { ProjectContextProps } from '../ProjectSection';
import { TaskList } from '@/components/app/tasks/TaskList';
import { TaskModal } from '@/components/app/tasks/TaskModal';

const ProjectViewPage = () => {
	const { project } = useOutletContext<ProjectContextProps>();
	const team = {
		manager: project.manager,
		team: project.team,
	};
	return (
		<section className='flex-1 overflow-auto'>
			<TaskList tasks={project.tasks} />
			<TaskModal team={team} />
		</section>
	);
};

export default ProjectViewPage;
