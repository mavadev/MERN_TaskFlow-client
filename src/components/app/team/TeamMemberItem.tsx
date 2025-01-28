import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { formatImage } from '@/utils';
import { deleteMemberFromProject } from '@/api/TeamProjectAPI';
import type { TeamMember } from '@/interfaces/team.interface';
import type { Project } from '@/interfaces/project.interface';

interface TeamMemberItemProps {
	isManager?: boolean;
	member: TeamMember;
}

export const TeamMemberItem = ({ isManager = false, member }: TeamMemberItemProps) => {
	const queryClient = useQueryClient();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const { mutate: deleteMember, isIdle } = useMutation({
		mutationFn: deleteMemberFromProject,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['project-team', projectId] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteMember = () => {
		window.confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?') &&
			deleteMember({ projectId, userId: member._id });
	};

	return (
		<div className='flex flex-col gap-2 p-5 border border-gray-400 w-full max-w-md'>
			<div className='flex items-end justify-between gap-4'>
				<div className='flex gap-2'>
					<img
						alt={member.name}
						src={formatImage(member.avatar)}
						className='w-10 h-10 rounded-full'
					/>
					<div>
						<p className='text-lg mb-1 font-semibold line-clamp-1'>{member.name}</p>
						<p className='text-sm text-gray-600'>{member.username}</p>
					</div>
				</div>
				{!isManager && (
					<div className='flex items-center gap-2'>
						<button
							disabled={!isIdle}
							onClick={handleDeleteMember}
							className='bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-default'>
							<TrashIcon className='w-5 h-5' />
						</button>
					</div>
				)}
			</div>
			<footer className={`px-4 py-2 rounded-md mt-4 ${isManager ? 'bg-indigo-500' : 'bg-cyan-500'}`}>
				<p className='text-white font-semibold uppercase text-sm'>{isManager ? 'Manager' : 'Colaborador'}</p>
			</footer>
		</div>
	);
};
