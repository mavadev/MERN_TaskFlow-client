import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

import { updateProject } from '@/api/ProjectAPI';
import { ProjectContextProps } from '../ProjectSection';
import ProjectForm from '@/components/app/projects/ProjectForm';
import type { Project, ProjectDraft } from '@/interfaces/project.interface';

const ProjectEditPage = () => {
	const { project } = useOutletContext<ProjectContextProps>();

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
			<header className='mb-5'>
				<h1 className='font-bold text-2xl md:text-3xl'>Editar Proyecto</h1>
				<p className='text-xl text-black text-balance mt-2'>
					Escribe cada uno de los nuevos datos para editar tu proyecto
				</p>
			</header>
			<Link
				to='/'
				className='btn btn-primary px-4 py-2 mb-10'>
				Volver a Proyectos
			</Link>

			<form
				noValidate
				onSubmit={handleSubmit(handleForm)}
				className='w-full max-w-xl space-y-8'>
				<ProjectForm
					errors={errors}
					register={register}
				/>
				<input
					type='submit'
					value='Editar Proyecto'
					className='btn-primary p-4 uppercase w-full'
				/>
			</form>
		</>
	);
};

export default ProjectEditPage;
