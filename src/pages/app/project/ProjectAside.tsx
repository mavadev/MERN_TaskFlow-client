import { Link } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import { ErrorScreen } from '@/components/ErrorScreen';
import { RectangleStackIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import LoadingSkeletonAside from './LoadingSkeletonAside';
import { UserItem } from '@/components/app/user/UserItem';
import type { Project } from '@/interfaces/project.interface';

interface ProjectAsideProps {
	isManager: boolean;
	project: Project;
	isProjectLoading: boolean;
}

const ProjectAside = ({ isManager, project, isProjectLoading }: ProjectAsideProps) => {
	if (isProjectLoading) return <LoadingSkeletonAside />;

	return (
		<aside className='p-4 pb-8 bg-surfaceContainerHigh flex flex-col w-full md:max-w-xs space-y-5'>
			<nav className='space-y-3'>
				<Link
					to='tasks'
					className='btn-primary text-sm uppercase !bg-secondary w-full p-3'>
					Tareas
				</Link>
				{isManager && (
					<Link
						to='team'
						className='btn-primary text-sm uppercase !bg-tertiary w-full p-3'>
						Colaboradores
					</Link>
				)}
			</nav>
			<header>
				<h2 className='uppercase font-bold text-outline'>Proyecto</h2>
				<h1
					title={project.projectName}
					className='font-bold text-2xl md:text-2xl text-balance line-clamp-3'>
					{project.projectName}
				</h1>
				<p className='text-sm font-semibold text-black mt-3 '>Cliente: {project.clientName}</p>
			</header>
			<main className='flex-1 flex flex-col gap-10 my-5'>
				<p className='text-sm leading-2 '>{project.description}</p>
				<div className='mt-auto flex justify-center gap-5'>
					<div
						title='TAREAS'
						className='flex items-center bg-secondary rounded flex-1'>
						<div className='p-2 border-r border-r-onPrimary text-onPrimary'>
							<RectangleStackIcon className='size-5' />
						</div>
						<p className='p-2 pl-4 text-onPrimary font-semibold'>{project.tasks.length}</p>
					</div>
					<div
						title='COLABORADORES'
						className='flex items-center bg-tertiary rounded flex-1'>
						<div className='p-2 border-r border-r-onPrimary text-onPrimary'>
							<UserGroupIcon className='size-5' />
						</div>
						<p className='p-2 pl-4 text-onPrimary font-semibold'>{project.team.length}</p>
					</div>
				</div>
				<UserItem user={project.manager} />
			</main>
		</aside>
	);
};

export default ProjectAside;
