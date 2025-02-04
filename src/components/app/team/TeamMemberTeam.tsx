import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formatImage } from '@/utils';
import { deleteMemberFromProject } from '@/api/TeamProjectAPI';
import type { TeamMember } from '@/interfaces/team.interface';
import type { Project } from '@/interfaces/project.interface';
import { UserItem } from '../user/UserItem';

interface TeamMemberTeamProps {
	member: TeamMember;
	confirmPassword: () => Promise<void>;
}

export const TeamMemberTeam = ({ member, confirmPassword }: TeamMemberTeamProps) => {
	const queryClient = useQueryClient();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const { mutate: deleteMember, isIdle } = useMutation({
		mutationFn: deleteMemberFromProject,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['project-team', projectId] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteMember = async () => {
		await confirmPassword();
		deleteMember({ projectId, userId: member._id });
	};

	return (
		<div className='p-5 border border-outline rounded w-full max-w-sm'>
			<div className='flex items-center justify-between gap-4'>
				<UserItem user={member} />
				<div className='flex items-center gap-2'></div>
			</div>
			<footer className='mt-5 flex justify-between items-end'>
				<p className='text-white font-bold uppercase text-xs px-4 py-2 rounded bg-secondary'>colaborador</p>
				<button
					disabled={!isIdle}
					onClick={handleDeleteMember}
					className='bg-error text-white p-2 rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-default'>
					<TrashIcon className='size-5' />
				</button>
			</footer>
		</div>
	);
};
