import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BookmarkSquareIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { leaveProject } from '@/api/SettingsAPI';
import { usePasswordConfirm } from '@/hooks/usePasswordConfirm';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface SettingsListProps {
	user?: ProjectConfig['manager']['username'];
	projects: ProjectConfig[];
}

const SettingsProjectsTeam = ({ user, projects }: SettingsListProps) => {
	const queryClient = useQueryClient();
	const { confirmPassword, ModalAuth } = usePasswordConfirm();

	const { mutate: leaveProjectMutation } = useMutation({
		mutationFn: leaveProject,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['projects-config'] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Ejecutar la acción
	const handleLeaveProject = async (projectId: string) => {
		await confirmPassword();
		leaveProjectMutation(projectId);
	};

	return (
		<section className='rounded-md border-2 border-secondary overflow-hidden'>
			<header className='flex items-center justify-between p-3 border-b-2 border-secondary bg-secondary'>
				<div className='flex items-center gap-2 text-sm font-semibold'>
					<BookmarkSquareIcon className='size-5 text-onSecondary' />
					<h3 className='text-onSecondary'>{user}</h3>
					<p className='text-onSecondary'>( {projects.length} )</p>
				</div>
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
						<button
							onClick={() => handleLeaveProject(project._id)}
							className='font-semibold text-white text-xs !bg-error hover:!bg-onErrorContainer px-4 py-1 rounded'>
							Salir
						</button>
					</div>
				))}
			</main>
			{ModalAuth}
		</section>
	);
};

export default SettingsProjectsTeam;
