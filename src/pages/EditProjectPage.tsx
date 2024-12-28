import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

import { Project, ProjectDraftData } from '@/interfaces';
import { getProject, updateProject } from '@/api/ProjectAPI';
import ProjectForm from '@/components/projects/ProjectForm';

const EditProjectPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const projectId = params.projectId as Project['_id'];

	// Obtener Proyecto
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editProject', projectId],
		queryFn: () => getProject(projectId),
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
		if (data) {
			reset({
				clientName: data.clientName,
				projectName: data.projectName,
				description: data.description,
			});
		}
	}, [data, reset]);

	// Petición a la API (PUT)
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateProject,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['editProject', projectId] });
			queryClient.invalidateQueries({ queryKey: ['projects'] });

			toast.success('Proyecto creado correctamente');
			navigate('/');
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleForm = (formData: ProjectDraftData) => mutate({ projectId, formData });

	// Condiciones de renderizado
	if (isLoading) return <h2>Cargando...</h2>;
	if (isError || !data) return <Navigate to='/404' />;

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
					onSubmit={handleSubmit(handleForm)}
					className='mt-10 bg-white shadow-lg p-10 rounded-lg w-full max-w-3xl'>
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
