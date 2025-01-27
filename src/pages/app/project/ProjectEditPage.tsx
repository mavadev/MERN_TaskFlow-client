import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProject } from '@/api/ProjectAPI';
import { useProject } from '../ProjectDetailsPage';
import ProjectForm from '@/components/app/projects/ProjectForm';
import type { Project, ProjectDraft } from '@/interfaces/project.interface';

const ProjectEditPage = () => {
	const { project } = useProject();

	const navigate = useNavigate();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	// Configuración de Formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			clientName: project?.clientName || '',
			projectName: project?.projectName || '',
			description: project?.description || '',
		},
	});

	// Petición a la API (PUT)
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateProject,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			queryClient.invalidateQueries({ queryKey: ['projects'] });

			toast.success(message);
			navigate('/app/projects');
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleForm = (formData: ProjectDraft) => mutate({ projectId, formData });

	return (
		<>
			<header>
				<h1 className='title'>Editar Proyecto</h1>
				<p className='subtitle'>Escribe cada uno de los nuevos datos para editar tu proyecto</p>

				<nav>
					<Link
						to='/'
						className='btn-primary mt-4'>
						Volver a Proyectos
					</Link>
				</nav>

				<form
					noValidate
					className='form--project'
					onSubmit={handleSubmit(handleForm)}>
					<ProjectForm
						errors={errors}
						register={register}
					/>
					<input
						type='submit'
						value='Editar Proyecto'
						className='btn-secondary p-4 w-full'
					/>
				</form>
			</header>
		</>
	);
};

export default ProjectEditPage;
