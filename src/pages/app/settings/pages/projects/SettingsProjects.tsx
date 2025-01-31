import { useContext, useMemo } from 'react';

import { ProfileContext } from '../../SettingsContext';
import SettingsProjectList from './SettingsProjectList';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface GroupProjects {
	[key: string]: ProjectConfig[];
}
const initialProjectsTeam: GroupProjects = {};

const SettingsProjects = () => {
	const { profile, projects } = useContext(ProfileContext);

	const projectsTeam = useMemo(
		() =>
			projects.teamProjects.reduce((prev, curr) => {
				let currentGroup = prev[curr.manager.username] ? [...prev[curr.manager.username]] : [];
				currentGroup = [...currentGroup, curr];
				return { ...prev, [curr.manager.username]: currentGroup };
			}, initialProjectsTeam),
		[projects.teamProjects]
	);

	return (
		<main className='space-y-10 p-5 flex-1'>
			<section className='space-y-5'>
				<h2 className='text-xl font-semibold mb-3 border-b border-gray-300 pb-2'>Proyectos gestionados</h2>
				<p className='text-sm text-gray-500'>
					Aquí podrás ver los proyectos que has gestionado. Si quieres crear un nuevo proyecto, puedes hacerlo aquí.
				</p>
				<SettingsProjectList
					manager={profile.username}
					projects={projects.managedProjects}
				/>
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
							/>
						))}
					</div>
				) : (
					<p className='text-sm text-gray-500 font-semibold'>No hay proyectos en equipo.</p>
				)}
			</section>
		</main>
	);
};

export default SettingsProjects;
