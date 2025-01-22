import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectTeam } from '@/api/TeamProjectAPI';
import type { Project } from '@/interfaces/project.interface';

const TeamProjectPage = () => {
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const {
		data: team,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['project-team', projectId],
		queryFn: () => getProjectTeam({ projectId }),
	});

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error</div>;

	console.log({ team });
	return <div>TeamProjectPage</div>;
};

export default TeamProjectPage;
