import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMemberToProject } from '@/api/TeamProjectAPI';
import type { UserSearch } from '@/interfaces/auth.interface';
import type { Project } from '@/interfaces/project.interface';
import { useState } from 'react';

interface FindMemberCardProps {
	user: UserSearch;
}

export const FindMemberCard = ({ user }: FindMemberCardProps) => {
	const queryClient = useQueryClient();
	const [statusAddMember, setStatusAddMember] = useState('idle');
	const { projectId } = useParams() as { projectId: Project['_id'] };
	const avatar = `${import.meta.env.VITE_PUBLIC_URL}${user.avatar}`;

	const { mutate: addMember } = useMutation({
		mutationFn: addMemberToProject,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['project-team', projectId] });
			setStatusAddMember('success');
		},
		onError: error => {
			toast.error(error.message);
			setStatusAddMember('error');
		},
	});

	const handleAddMember = () => {
		setStatusAddMember('loading');
		addMember({ projectId, userId: user._id });
	};

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<img
					src={avatar}
					alt={user.name}
					className='w-12 h-12 rounded-full'
				/>
				<div>
					<h3 className='text-lg font-bold'>{user.name} </h3>
					<p className='text-sm text-gray-500'>{user.username}</p>
				</div>
			</div>
			<button
				onClick={handleAddMember}
				disabled={statusAddMember !== 'idle'}
				className='btn bg-black/90 px-4 py-3 disabled:opacity-50 disabled:cursor-default'>
				{statusAddMember === 'idle' ? 'Añadir' : statusAddMember === 'loading' ? 'Añadiendo...' : 'Añadido'}
			</button>
		</div>
	);
};
