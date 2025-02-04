import { UserItem } from '../user/UserItem';
import type { TeamMember } from '@/interfaces/team.interface';

interface TeamMemberManagerProps {
	member: TeamMember;
}

export const TeamMemberManager = ({ member }: TeamMemberManagerProps) => {
	return (
		<div className='p-5 border border-outline rounded w-full max-w-sm	'>
			<UserItem user={member} />
			<p className='ml-auto mt-6 w-max text-white font-bold uppercase text-xs px-4 py-2 rounded bg-primaryContainer'>
				Manager
			</p>
		</div>
	);
};
