import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProject } from '@/api/ProjectAPI';
import type { ProjectSimple } from '@/interfaces/project.interface';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatImage } from '@/utils';

interface ProjectProps {
	project: ProjectSimple;
	type: 'managed' | 'team';
	confirmAction?: () => Promise<void>;
}

export const ProjectItem = ({ project, type, confirmAction }: ProjectProps) => {
	const queryClient = useQueryClient();

	const { mutate: handleDelete } = useMutation({
		mutationFn: deleteProject,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteProject = async () => {
		if (confirmAction) {
			await confirmAction();
			handleDelete({ projectId: project._id });
		}
	};

	return (
		<li className='flex flex-col rounded-md border border-outline w-full max-w-sm bg-surfaceContainerLow'>
			<Link
				className='flex-1 relative flex flex-col p-8'
				to={`/app/projects/${project._id}`}>
				{type === 'team' && (
					<p
						title={project.manager.name}
						className='absolute top-5 right-5 px-2 py-1 text-sm rounded bg-primary text-onPrimary w-max max-w-40 line-clamp-1'>
						{project.manager.username}
					</p>
				)}
				<p className='text-gray-600 text-sm mt-1'>{project.clientName}</p>
				<h3 className='text-black text-xl font-bold line-clamp-1'>{project.projectName}</h3>
				<div className='flex items-end justify-between'>
					<p className='text-gray-800 mt-5 line-clamp-2'>{project.description}</p>
					<div className='flex'>
						{project.team.map(
							(user, pos) =>
								pos < 4 && (
									<div
										key={user._id}
										title={user.name}
										className='size-7 rounded-full bg-white relative -mr-2 overflow-hidden shadow shadow-outline'>
										<img
											alt={user.username}
											className='w-full h-full'
											src={formatImage(user.avatar)}
										/>
									</div>
								)
						)}
					</div>
				</div>
			</Link>
			<div className='w-full flex items-center'>
				<Link
					title='Ver proyecto'
					to={`/app/projects/${project._id}`}
					className='block p-3 flex-1 bg-surfaceDim text-onSurfaceVariant border-t-2 border-transparent hover:border-onSurfaceVariant'>
					<EyeIcon className='size-5 mx-auto' />
				</Link>
				{type === 'managed' && (
					<>
						<Link
							title='Editar proyecto'
							to={`/app/projects/${project._id}/edit`}
							className='block p-3 flex-1 bg-inversePrimary text-onPrimaryContainer border-t-2 border-transparent hover:border-primary'>
							<PencilSquareIcon className='size-5 mx-auto' />
						</Link>
						<button
							title='Eliminar proyecto'
							onClick={handleDeleteProject}
							className='block p-3 flex-1 bg-errorContainer text-onErrorContainer border-t-2 border-transparent hover:border-onErrorContainer'>
							<TrashIcon className='size-5 mx-auto' />
						</button>
					</>
				)}
			</div>
		</li>
	);
};
