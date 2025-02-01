import { toast } from 'react-toastify';
import { useContext, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteProjects, leaveProject } from '@/api/SettingsAPI';
import { ProfileContext } from '../../SettingsContext';
import SettingsProjectList from './SettingsProjectList';
import ModalSecurity from '@/components/app/ModalSecurity';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface GroupProjects {
	[key: string]: ProjectConfig[];
}
const initialProjectsTeam: GroupProjects = {};

export type SelectAction = null | { type: 'all' } | { type: 'team'; projectId: string };

const SettingsProjects = () => {
	const queryClient = useQueryClient();
	const { profile, projects } = useContext(ProfileContext);
	const [showModalSecurity, setShowModalSecurity] = useState(false);
	const [selectedAction, setSelectedAction] = useState<SelectAction>(null);

	// Agrupar proyectos del usuario
	const projectsTeam = useMemo(
		() =>
			projects.teamProjects.reduce((prev, curr) => {
				let currentGroup = prev[curr.manager.username] ? [...prev[curr.manager.username]] : [];
				currentGroup = [...currentGroup, curr];
				return { ...prev, [curr.manager.username]: currentGroup };
			}, initialProjectsTeam),
		[projects.teamProjects]
	);

	// Eliminar todos los proyectos
	const { mutate: deleteProjectsMutation } = useMutation({
		mutationFn: deleteProjects,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Salir de un proyecto
	const { mutate: leaveProjectMutation } = useMutation({
		mutationFn: leaveProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Manejar el click en el botón de eliminar
	const handleActionClick = (action: SelectAction) => {
		setSelectedAction(action);
		setShowModalSecurity(true);
	};

	// Ejecutar la acción
	const handleSuccess = () => {
		if (selectedAction?.type === 'all') {
			deleteProjectsMutation();
			toast.success('Proyectos eliminados correctamente');
		} else if (selectedAction?.type === 'team') {
			leaveProjectMutation(selectedAction.projectId);
			toast.success('Te has salido del proyecto correctamente');
		}
		setShowModalSecurity(false);
	};

	return (
		<main className='space-y-10 p-5 flex-1'>
			<section className='space-y-5'>
				<h2 className='text-xl font-semibold mb-3 border-b border-gray-300 pb-2'>Proyectos gestionados</h2>
				<p className='text-sm text-gray-500'>
					Aquí podrás ver los proyectos que has gestionado. Si quieres crear un nuevo proyecto, puedes hacerlo aquí.
				</p>
				{projects.managedProjects.length ? (
					<SettingsProjectList
						manager={profile.username}
						projects={projects.managedProjects}
						handleDeleteClick={handleActionClick}
					/>
				) : (
					<p className='text-sm text-gray-500 font-semibold'>No hay proyectos gestionados.</p>
				)}
			</section>
			<section className='space-y-5'>
				<h2 className='text-xl font-semibold mb-3 border-b border-gray-300 pb-2'>Proyectos en equipo</h2>
				<p className='text-sm text-gray-500'>
					Aquí podrás ver los proyectos en los que estás colaborando. Si quieres salir de un proyecto, puedes hacerlo
					aquí.
				</p>
				{Object.keys(projectsTeam).length ? (
					<div className='space-y-5'>
						{Object.entries(projectsTeam).map(([manager, projects]) => (
							<SettingsProjectList
								type='team'
								key={manager}
								manager={manager}
								projects={projects}
								handleDeleteClick={handleActionClick}
							/>
						))}
					</div>
				) : (
					<p className='text-sm text-gray-500 font-semibold'>No hay proyectos en equipo.</p>
				)}
			</section>
			<ModalSecurity
				show={showModalSecurity}
				handleSuccess={handleSuccess}
			/>
		</main>
	);
};

export default SettingsProjects;
