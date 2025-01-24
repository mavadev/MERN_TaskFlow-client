import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import type { Project, ProjectCreate } from '@/interfaces/project.interface';
import ProjectForm from '@/components/app/projects/ProjectForm';
import { getProject, updateProject } from '@/api/ProjectAPI';
import { useAuth } from '@/hooks/useAuth';

const EditProjectPage = () => {
	const navigate = useNavigate();
	const { data: user } = useAuth();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	// Obtener Proyecto
	const {
		data: project,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['project--edit', projectId],
		queryFn: () => getProject({ projectId }),
	});

	// Configuración de Formulario
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			clientName: '',
			projectName: '',
			description: '',
		},
	});

	// Actualizar cuando los datos estén listos
	useEffect(() => {
		if (project) {
			reset({
				clientName: project.clientName,
				projectName: project.projectName,
				description: project.description,
			});
		}
	}, [project, reset]);

	// Petición a la API (PUT)
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateProject,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['project--edit', projectId] });
			queryClient.invalidateQueries({ queryKey: ['projects'] });

			toast.success(message);
			navigate('/');
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleForm = (formData: ProjectCreate) => mutate({ projectId, formData });

	// Condiciones de renderizado
	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || user?._id !== project?.manager) return <Navigate to='/404' />;

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

export default EditProjectPage;
