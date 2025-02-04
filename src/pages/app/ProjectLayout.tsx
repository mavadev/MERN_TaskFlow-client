import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getProject } from '@/api/ProjectAPI';
import ProjectAside from './project/ProjectAside';
import ProjectSection from './project/ProjectSection';
import { ErrorScreen } from '@/components/ErrorScreen';
import type { Project } from '@/interfaces/project.interface';
import { useAuth } from '@/hooks/useAuth';

const ProjectLayout = () => {
	const { projectId } = useParams() as { projectId: Project['_id'] };
	const { user, isUserError } = useAuth();

	const {
		data: project,
		isLoading: isProjectLoading,
		isError: isProjectError,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject({ projectId }),
		retry: false,
	});

	if (isProjectError || isUserError) return <ErrorScreen />;

	const isManager = user?._id === project?.manager._id;
	return (
		<div className='flex-1 flex flex-col md:flex-row'>
			<ProjectAside
				isManager={isManager}
				project={project!}
				isProjectLoading={isProjectLoading}
			/>
			<ProjectSection
				isManager={isManager}
				project={project!}
				isProjectLoading={isProjectLoading}
			/>
		</div>
	);
};

export default ProjectLayout;
