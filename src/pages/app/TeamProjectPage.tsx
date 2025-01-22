import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getProjectTeam } from '@/api/TeamProjectAPI';
import { TeamMemberCard } from '@/components/app/team/TeamMemberCard';
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
		retry: false,
	});

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error</div>;

	return (
		<div>
			<div className='mb-3'>
				<h2 className='uppercase font-bold text-gray-600'>Colaboradores</h2>
				<h1 className='font-bold text-2xl md:text-3xl'>Administrar Equipo</h1>
			</div>
			<p className='text-lg text-gray-900 text-balance mb-10'>Administra los colaboradores del proyecto</p>
			{team?.map(member => (
				<TeamMemberCard
					key={member._id}
					member={member}
				/>
			))}
		</div>
	);
};

export default TeamProjectPage;
