import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import { getProjects } from '@/api/ProjectAPI';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

const DashboardPage = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['projects'],
		queryFn: getProjects,
	});

	return (
		<>
			<header>
				<h1 className='title'>Mis Proyectos</h1>
				<p className='subtitle'>Administra tus proyectos</p>

				<nav>
					<Link
						to='/projects/create'
						className='btn-primary mt-4'>
						Nuevo Proyecto
					</Link>
				</nav>
			</header>

			{data?.length ? (
				<ul
					role='list'
					className='my-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
					{' '}
					{data.map(project => (
						<li
							key={project._id}
							className='flex justify-between items-start gap-x-6 p-8 shadow rounded-md border-gray-100 bg-white'>
							{/* Información */}
							<div className='flex flex-col'>
								<p className='text-sm text-gray-400 mb-1'>Cliente: {project.clientName}</p>
								<Link
									to={``}
									className='text-gray-600 hover:text-gray-900 text-xl font-bold transition-colors'>
									{project.projectName}
								</Link>
								<p className='text-sm text-gray-400 mt-3 line-clamp-2'>{project.description}</p>
							</div>
							{/* Menú */}
							<Menu
								as='div'
								className='relative'>
								<MenuButton className='block text-gray-500 hover:text-gray-900'>
									<span className='sr-only'>Opciones de Proyecto</span>
									<EllipsisVerticalIcon
										aria-hidden='true'
										className='h-7 w-7'
									/>
								</MenuButton>
								<Transition
									as={Fragment}
									enter='transition ease-out duration-100'
									enterFrom='transform opacity-0 scale-95'
									enterTo='transform opacity-100 scale-100'
									leave='transition ease-in duration-75'
									leaveFrom='transform opacity-100 scale-100'
									leaveTo='transform opacity-0 scale-95'>
									<MenuItems className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none text-center'>
										<MenuItem>
											<Link
												to={``}
												className='block px-3 py-2 text-sm leading-6 text-gray-900 w-full hover:bg-gray-50'>
												Ver Proyecto
											</Link>
										</MenuItem>
										<MenuItem>
											<Link
												to={`/projects/edit/${project._id}`}
												className='block px-3 py-2 text-sm leading-6 text-gray-900 w-full hover:bg-gray-50'>
												Editar Proyecto
											</Link>
										</MenuItem>
										<MenuItem>
											<button
												type='button'
												onClick={() => {}}
												className='block px-3 py-2 text-sm leading-6 text-red-600 w-full hover:bg-gray-50'>
												Eliminar Proyecto
											</button>
										</MenuItem>
									</MenuItems>
								</Transition>
							</Menu>
						</li>
					))}
				</ul>
			) : (
				<div className='flex flex-col items-center text-2xl gap-3'>
					<DocumentTextIcon width={70} />
					<h2>No tienes ningún proyecto</h2>
				</div>
			)}
		</>
	);
};

export default DashboardPage;
