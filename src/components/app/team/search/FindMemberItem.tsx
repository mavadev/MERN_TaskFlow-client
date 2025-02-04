import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import { UserItem } from '../../user/UserItem';
import { addMemberToProject } from '@/api/TeamProjectAPI';
import type { Project } from '@/interfaces/project.interface';
import type { UserSimple } from '@/interfaces/user.interface';

type StatusAddMember = 'idle' | 'loading' | 'success' | 'error';
const statusAdd: Record<StatusAddMember, ReactNode> = {
	idle: <PlusCircleIcon className='size-6' />,
	error: <XCircleIcon className='size-6' />,
	success: <CheckCircleIcon className='size-6' />,
	loading: (
		<BeatLoader
			size={6}
			color='white'
		/>
	),
};

interface FindMemberItemProps {
	user: UserSimple;
}

export const FindMemberItem = ({ user }: FindMemberItemProps) => {
	const queryClient = useQueryClient();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const [statusAddMember, setStatusAddMember] = useState<StatusAddMember>('idle');

	// Añadir nuevo usuario
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
			<UserItem user={user} />
			<button
				onClick={handleAddMember}
				disabled={statusAddMember !== 'idle'}
				className='btn bg-primaryContainer px-4 py-2 disabled:opacity-50 disabled:cursor-default text-white'>
				{statusAdd[statusAddMember]}
			</button>
		</div>
	);
};
