import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { ProjectDraftData } from '@/interfaces';
import { createProject } from '@/api/ProjectAPI';
import ProjectForm from '@/components/projects/ProjectForm';

const CreateProjectPage = () => {
	const navigate = useNavigate();
	const initialValues: ProjectDraftData = {
		clientName: '',
		projectName: '',
		description: '',
	};
	// Creación de datos/métodos para formulario
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	// Petición a la API (POST)
	const { mutate } = useMutation({
		mutationFn: createProject,
		onSuccess: () => {
			toast.success('Proyecto creado correctamente');
			navigate('/');
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleForm = (formData: ProjectDraftData) => mutate(formData);
	return (
		<>
			<header>
				<h1 className='title'>Crear Proyecto</h1>
				<p className='subtitle'>Rellena los datos para crear tu nuevo proyecto</p>

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
						register={register}
						errors={errors}
					/>
					<input
						type='submit'
						value='Crear Proyecto'
						className='btn-secondary p-4 w-full'
					/>
				</form>
			</header>
		</>
	);
};

export default CreateProjectPage;
