import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BookmarkSquareIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline';

import { deleteProjects } from '@/api/SettingsAPI';
import { usePasswordConfirm } from '@/hooks/usePasswordConfirm';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface SettingsProjectList {
	user?: ProjectConfig['manager']['username'];
	projects: ProjectConfig[];
}

const SettingsProjectsManaged = ({ user, projects }: SettingsProjectList) => {
	const queryClient = useQueryClient();
	const { confirmPassword, ModalAuth } = usePasswordConfirm();

	const { mutate: deleteProjectsMutation } = useMutation({
		mutationFn: deleteProjects,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['projects-config'] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteProjects = async () => {
		await confirmPassword();
		deleteProjectsMutation();
	};

	if (!projects.length) return <p className='text-sm text-gray-500 font-semibold'>No hay proyectos gestionados.</p>;

	return (
		<section className='rounded-md border-2 border-secondary overflow-hidden'>
			<header className='flex items-center justify-between p-3 border-b-2 border-secondary bg-secondary'>
				<div className='flex items-center gap-2 text-sm font-semibold'>
					<BookmarkSquareIcon className='size-5 text-onSecondary ' />
					<h3 className='text-onSecondary'>{user}</h3>
					<p className='text-onSecondary'>( {projects.length} )</p>
				</div>

				<button
					type='button'
					className='text-xs text-red-500 hover:text-red-700'
					onClick={handleDeleteProjects}>
					<TrashIcon className='size-5 text-onSecondary' />
				</button>
			</header>
			<main>
				{projects.map(project => (
					<div
						key={project._id}
						className='p-3 border-b-2 border-secondary last:border-none flex items-center justify-between'>
						<Link
							to={`/app/projects/${project._id}`}
							className='text-sm hover:underline line-clamp-1'>
							{project.projectName}
						</Link>
						{project.team.length > 0 && (
							<div className='flex gap-2 items-center'>
								<p className='text-sm text-gray-600'>
									{project.team.length} {project.team.length === 1 ? 'colaborador' : 'colaboradores'}
								</p>
								<UsersIcon className='size-4' />
							</div>
						)}
					</div>
				))}
			</main>
			{ModalAuth}
		</section>
	);
};

export default SettingsProjectsManaged;
