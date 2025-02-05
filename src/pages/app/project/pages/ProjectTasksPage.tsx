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
		<>
			<TaskList tasks={project.tasks} />
			<TaskModal team={team} />
		</>
	);
};

export default ProjectViewPage;
