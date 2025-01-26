import { useNavigate } from 'react-router-dom';

import { useProject } from '../ProjectDetailsPage';
import { TeamList, AddMemberModal } from '@/components/app/team';

const ProjectTeamPage = () => {
	const { team } = useProject();
	const navigate = useNavigate();

	const handleAddMember = () => navigate(location.pathname + '?addMember=true', { replace: true });

	return (
		<div>
			<div className='mb-3'>
				<h2 className='uppercase font-bold text-gray-600'>Colaboradores</h2>
				<h1 className='font-bold text-2xl md:text-3xl'>Administrar Equipo</h1>
			</div>
			<p className='text-lg text-gray-900 text-balance mb-5'>Administra los colaboradores del proyecto</p>
			<button
				className='btn btn-primary mb-10'
				onClick={handleAddMember}>
				Añadir colaborador
			</button>
			<TeamList team={team} />

			<AddMemberModal />
		</div>
	);
};

export default ProjectTeamPage;
