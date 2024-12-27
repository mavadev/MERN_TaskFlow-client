import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useParams } from 'react-router-dom';

import { ProjectDraftData } from '@/interfaces';
import { getProjectById } from '@/api/ProjectAPI';
import ProjectForm from '@/components/projects/ProjectForm';

const EditProjectPage = () => {
	// Obtener Proyecto
	const { projectId } = useParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ['editProject', projectId],
		queryFn: () => getProjectById(projectId!),
	});

	// Validación de datos
	if (isLoading) return <h1>'Cargando...'</h1>;
	if (isError) return <Navigate to='/404' />;
	if (!data) return <h2>Data no valida</h2>;

	// Datos de Formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			clientName: data.clientName,
			projectName: data.projectName,
			description: data.description,
		},
	});

	// Petición a la API (PUT)
	const handleForm = (formData: ProjectDraftData) => {
		console.log(formData);
	};

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
						register={register}
						errors={errors}
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
