import { TeamMemberTeam } from './TeamMemberTeam';
import { TeamMemberManager } from './TeamMemberManager';
import type { TeamResponse } from '@/interfaces/team.interface';
import { usePasswordConfirm } from '@/hooks/usePasswordConfirm';

interface TeamListProps {
	team: TeamResponse;
	isManager: boolean;
}

export const TeamList = ({ team: { manager, team }, isManager }: TeamListProps) => {
	const { confirmPassword, ModalAuth } = usePasswordConfirm();

	return (
		<div className='flex flex-wrap gap-5 mt-10'>
			<TeamMemberManager member={manager} />
			{team?.map(member => (
				<TeamMemberTeam
					member={member}
					key={member._id}
					isManager={isManager}
					confirmPassword={confirmPassword}
				/>
			))}
			{ModalAuth}
		</div>
	);
};
