import { Link } from 'react-router-dom';
import { BookmarkSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import SettingsProjectItem from './SettingsProjectItem';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface SettingsProjectListProps {
	type?: 'managed' | 'team';
	manager: string;
	projects: ProjectConfig[];
}

const SettingsProjectList = ({ type = 'managed', manager, projects }: SettingsProjectListProps) => {
	const handleDeleteProjects = () => {
		if (window.confirm('¿Estás seguro de que quieres eliminar todos tus proyectos?')) {
			console.log('Eliminar Proyectos');
		}
	};

	return (
		<div className='rounded-md border-2 border-gray-300'>
			<header className='flex items-center justify-between p-3 border-b-2 border-gray-300'>
				<div className='flex items-center gap-2 text-sm font-semibold'>
					<BookmarkSquareIcon className='size-5' />
					<h3>{manager}</h3>
					<p>( {projects.length} )</p>
				</div>
				{type === 'managed' && (
					<Link
						to='?deleteProjects=true'
						onClick={handleDeleteProjects}
						className='text-xs text-red-500 hover:text-red-700'>
						<TrashIcon className='size-4' />
					</Link>
				)}
			</header>
			<main>
				{projects.map(project => (
					<SettingsProjectItem
						type={type}
						key={project._id}
						project={project}
					/>
				))}
			</main>
		</div>
	);
};

export default SettingsProjectList;
