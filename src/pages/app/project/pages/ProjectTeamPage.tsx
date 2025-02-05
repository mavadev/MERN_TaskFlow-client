import { useNavigate, useOutletContext } from 'react-router-dom';

import { ProjectContextProps } from '../ProjectSection';
import { TeamList, AddMemberModal } from '@/components/app/team';

const ProjectTeamPage = () => {
	const navigate = useNavigate();
	const { team, isManager } = useOutletContext<ProjectContextProps>();

	const handleAddMember = () => navigate(location.pathname + '?addMember=true', { replace: true });

	return (
		<>
			<header className='mb-5'>
				<h2 className='uppercase font-bold text-outline'>Colaboradores</h2>
				<h1 className='font-bold text-2xl md:text-3xl'>Administrar Equipo</h1>
				<p className='text-xl text-black text-balance mt-2'>Administra los colaboradores del proyecto</p>
			</header>
			{isManager && (
				<button
					onClick={handleAddMember}
					className='btn btn-primary px-4 py-2'>
					Añadir colaborador
				</button>
			)}
			<TeamList
				team={team}
				isManager={isManager}
			/>
			<AddMemberModal />
		</>
	);
};

export default ProjectTeamPage;
