import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getProjectTeam } from '@/api/TeamProjectAPI';
import type { Project } from '@/interfaces/project.interface';
import { TeamMembers, AddTeamMemberModal } from '@/components/app/team';

const TeamProjectPage = () => {
	const navigate = useNavigate();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	// Obtener colaboradores
	const {
		data: team,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['project-team', projectId],
		queryFn: () => getProjectTeam({ projectId }),
		retry: false,
	});

	const handleNavigate = () => navigate(location.pathname + '?addMember=true');

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <Navigate to='/404' />;

	return (
		<div>
			<div className='mb-3'>
				<h2 className='uppercase font-bold text-gray-600'>Colaboradores</h2>
				<h1 className='font-bold text-2xl md:text-3xl'>Administrar Equipo</h1>
			</div>
			<p className='text-lg text-gray-900 text-balance mb-5'>Administra los colaboradores del proyecto</p>
			<button
				className='btn btn-primary mb-10'
				onClick={handleNavigate}>
				Añadir colaborador
			</button>
			<TeamMembers team={team!} />

			<AddTeamMemberModal />
		</div>
	);
};

export default TeamProjectPage;
