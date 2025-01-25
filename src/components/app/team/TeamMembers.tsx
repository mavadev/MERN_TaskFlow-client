import { TeamMemberCard } from './TeamMemberCard';
import type { TeamResponse } from '@/interfaces/team.interface';

interface TeamMembersProps {
	teamData: TeamResponse;
}

export const TeamMembers = ({ teamData: { manager, team } }: TeamMembersProps) => {
	return (
		<div className='flex flex-wrap gap-5'>
			<TeamMemberCard
				isManager={true}
				key={manager._id}
				member={manager}
			/>
			{team?.map(member => (
				<TeamMemberCard
					key={member._id}
					member={member}
				/>
			))}
		</div>
	);
};
