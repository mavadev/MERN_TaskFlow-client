import { TeamMemberTeam } from './TeamMemberTeam';
import { TeamMemberManager } from './TeamMemberManager';
import type { TeamResponse } from '@/interfaces/team.interface';
import { usePasswordConfirm } from '@/hooks/usePasswordConfirm';

interface TeamListProps {
	team: TeamResponse;
}

export const TeamList = ({ team: { manager, team } }: TeamListProps) => {
	const { confirmPassword, ModalAuth } = usePasswordConfirm();

	return (
		<div className='flex flex-wrap gap-5'>
			<TeamMemberManager member={manager} />
			{team?.map(member => (
				<TeamMemberTeam
					key={member._id}
					member={member}
					confirmPassword={confirmPassword}
				/>
			))}
			{ModalAuth}
		</div>
	);
};
