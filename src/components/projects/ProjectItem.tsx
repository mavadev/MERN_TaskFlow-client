import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MenuItem } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Project } from '@/interfaces';
import { deleteProject } from '@/api/ProjectAPI';
import { OptionsMenu } from '../OptionsMenu';

interface ProjectProps {
	project: Project;
}

export const ProjectItem = ({ project }: ProjectProps) => {
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

	return (
		<li className='flex justify-between items-center gap-x-6 rounded-md bg-card shadow hover:shadow-lg'>
			<Link
				className='flex-1'
				to={`/projects/${project._id}`}>
				<div className='flex flex-col p-8'>
					<p className='text-gray-500 text-sm mb-1'>Cliente: {project.clientName}</p>
					<h3 className='text-gray-800 text-xl font-bold line-clamp-1'>{project.projectName}</h3>
					<p className='text-gray-800 mt-3 line-clamp-2 text-balance'>{project.description}</p>
				</div>
			</Link>
			<div className='w-14 h-full rounded-r-md bg-primary-500 grid place-content-center'>
				<OptionsMenu light>
					<MenuItem>
						<Link
							to={`/projects/${project._id}`}
							className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
							Ver Proyecto
						</Link>
					</MenuItem>
					<MenuItem>
						<Link
							to={`/projects/${project._id}/edit`}
							className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
							Editar Proyecto
						</Link>
					</MenuItem>
					<MenuItem>
						<button
							type='button'
							onClick={() => handleDelete({ projectId: project._id })}
							className='block px-3 py-2 text-sm font-medium leading-6 bg-red-500 w-full hover:bg-red-600 text-white text-center'>
							Eliminar Proyecto
						</button>
					</MenuItem>
				</OptionsMenu>
			</div>
		</li>
	);
};
