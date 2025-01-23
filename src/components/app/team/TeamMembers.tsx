import { TeamMemberCard } from './TeamMemberCard';
import type { TeamProject } from '@/interfaces/team.interface';

interface TeamMembersProps {
	team: TeamProject;
}

export const TeamMembers = ({ team }: TeamMembersProps) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
			{team?.map(member => (
				<TeamMemberCard
					key={member._id}
					member={member}
				/>
			))}
		</div>
	);
};
