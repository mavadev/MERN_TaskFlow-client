import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MenuItem } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OptionsItem } from '../OptionsItem';
import { deleteProject } from '@/api/ProjectAPI';
import type { ProjectSimple } from '@/interfaces/project.interface';

interface ProjectProps {
	project: ProjectSimple;
	type: 'managed' | 'team';
}

export const ProjectItem = ({ project, type }: ProjectProps) => {
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

	const handleDeleteProject = () => {
		if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
			handleDelete({ projectId: project._id });
		}
	};

	return (
		<li className='flex justify-between items-center rounded-md bg-card border border-gray-500 shadow-xl shadow-gray-400 max-w-md'>
			<Link
				className='flex-1'
				to={`/app/projects/${project._id}`}>
				<div className='flex flex-col p-8'>
					<p className='text-gray-500 text-sm mb-1'>Cliente: {project.clientName}</p>
					<h3 className='text-gray-800 text-xl font-bold line-clamp-1'>{project.projectName}</h3>
					<p className='text-gray-800 mt-3 line-clamp-2 text-balance'>{project.description}</p>
				</div>
			</Link>
			{type === 'managed' && (
				<div className='w-14 h-full rounded-r-md bg-primary-500 grid place-content-center'>
					<OptionsItem>
						<MenuItem>
							<Link
								to={`/app/projects/${project._id}`}
								className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
								Ver Proyecto
							</Link>
						</MenuItem>
						<MenuItem>
							<Link
								to={`/app/projects/${project._id}/edit`}
								className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
								Editar Proyecto
							</Link>
						</MenuItem>
						<MenuItem>
							<button
								type='button'
								onClick={handleDeleteProject}
								className='block px-3 py-2 text-sm font-medium leading-6 bg-red-500 w-full hover:bg-red-600 text-white text-center'>
								Eliminar Proyecto
							</button>
						</MenuItem>
					</OptionsItem>
				</div>
			)}
		</li>
	);
};
