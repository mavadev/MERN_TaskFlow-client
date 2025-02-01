import { BookmarkSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { SelectAction } from './SettingsProjects';
import SettingsProjectItem from './SettingsProjectItem';
import type { ProjectConfig } from '@/interfaces/project.interface';

interface SettingsProjectListProps {
	type?: 'managed' | 'team';
	manager: string;
	projects: ProjectConfig[];
	handleDeleteClick: (action: SelectAction) => void;
}

const SettingsProjectList = ({ type = 'managed', manager, projects, handleDeleteClick }: SettingsProjectListProps) => {
	return (
		<div className='rounded-md border-2 border-gray-300'>
			<header className='flex items-center justify-between p-3 border-b-2 border-gray-300'>
				<div className='flex items-center gap-2 text-sm font-semibold'>
					<BookmarkSquareIcon className='size-5' />
					<h3>{manager}</h3>
					<p>( {projects.length} )</p>
				</div>
				{type === 'managed' && (
					<button
						type='button'
						className='text-xs text-red-500 hover:text-red-700'
						onClick={() => handleDeleteClick({ type: 'all' })}>
						<TrashIcon className='size-4' />
					</button>
				)}
			</header>
			<main>
				{projects.map(project => (
					<SettingsProjectItem
						type={type}
						key={project._id}
						project={project}
						handleDeleteClick={handleDeleteClick}
					/>
				))}
			</main>
		</div>
	);
};

export default SettingsProjectList;
