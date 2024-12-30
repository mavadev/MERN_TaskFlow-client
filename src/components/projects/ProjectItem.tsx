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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects'] });
			toast.success('Proyecto eliminado correctamente');
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	return (
		<li className='flex justify-between items-start gap-x-6 p-8 shadow rounded-md border-gray-100 bg-white border-l-8 border-l-amber-500'>
			<div className='flex flex-col'>
				<p className='text-sm text-gray-400 mb-1'>Cliente: {project.clientName}</p>
				<Link
					to={`/projects/${project._id}`}
					className='text-gray-600 hover:text-gray-900 text-xl font-bold transition-colors'>
					{project.projectName}
				</Link>
				<p className='text-gray-700 mt-3 line-clamp-2'>{project.description}</p>
			</div>
			<OptionsMenu>
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
						className='block px-3 py-2 text-sm font-medium leading-6 text-red-600 w-full hover:bg-gray-50'>
						Eliminar Proyecto
					</button>
				</MenuItem>
			</OptionsMenu>
		</li>
	);
};
