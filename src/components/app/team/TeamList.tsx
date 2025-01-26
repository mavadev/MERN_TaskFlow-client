import { TeamMemberItem } from './TeamMemberItem';
import type { TeamResponse } from '@/interfaces/team.interface';

interface TeamListProps {
	team: TeamResponse;
}

export const TeamList = ({ team: { manager, team } }: TeamListProps) => {
	return (
		<div className='flex flex-wrap gap-5'>
			<TeamMemberItem
				isManager={true}
				key={manager._id}
				member={manager}
			/>
			{team?.map(member => (
				<TeamMemberItem
					key={member._id}
					member={member}
				/>
			))}
		</div>
	);
};
