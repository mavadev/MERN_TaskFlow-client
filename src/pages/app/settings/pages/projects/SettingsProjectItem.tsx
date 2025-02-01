import { Link } from 'react-router-dom';
import { UsersIcon } from '@heroicons/react/24/outline';
import type { ProjectConfig } from '@/interfaces/project.interface';

import { SelectAction } from './SettingsProjects';

interface SettingsProjectItemProps {
	project: ProjectConfig;
	type: 'team' | 'managed';
	handleDeleteClick: (action: SelectAction) => void;
}

const SettingsProjectItem = ({ project, type, handleDeleteClick }: SettingsProjectItemProps) => {
	return (
		<div
			key={project._id}
			className='p-3 border-b-2 border-gray-300 last:border-none flex items-center justify-between'>
			<Link
				to={`/app/projects/${project._id}`}
				className='text-sm hover:underline line-clamp-1'>
				{project.projectName}
			</Link>
			{type === 'team' ? (
				<button
					onClick={() => handleDeleteClick({ type: 'team', projectId: project._id })}
					className='font-semibold text-white text-xs !bg-red-500 hover:!bg-red-700 px-4 py-1 rounded'>
					Salir
				</button>
			) : (
				type === 'managed' &&
				project.team.length > 0 && (
					<div className='flex gap-2 items-center'>
						<p className='text-sm text-gray-600'>
							{project.team.length} {project.team.length === 1 ? 'colaborador' : 'colaboradores'}
						</p>
						<UsersIcon className='size-4' />
					</div>
				)
			)}
		</div>
	);
};

export default SettingsProjectItem;
