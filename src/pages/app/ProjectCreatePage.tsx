import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

import { createProject } from '@/api/ProjectAPI';
import ProjectForm from '@/components/app/projects/ProjectForm';
import type { ProjectDraft } from '@/interfaces/project.interface';

const CreateProjectPage = () => {
	const navigate = useNavigate();
	const initialValues: ProjectDraft = {
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
		onSuccess: message => {
			toast.success(message);
			navigate('/app');
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleForm = (formData: ProjectDraft) => mutate({ formData });
	return (
		<>
			<header className='py-10 flex flex-col max-md:items-center'>
				<div className='max-md:text-center'>
					<h1 className='text-3xl font-bold'>Crear Proyecto</h1>
					<p className='text-2xl mt-2 text-balance'>
						Rellena los datos para crear tu <span className='text-primary font-semibold'>nuevo proyecto</span>
					</p>
				</div>
			</header>

			<form
				noValidate
				className='w-full max-w-xl space-y-8 mt-5 mb-10'
				onSubmit={handleSubmit(handleForm)}>
				<ProjectForm
					register={register}
					errors={errors}
				/>
				<input
					type='submit'
					value='Crear Proyecto'
					className='btn-primary p-4 uppercase w-full'
				/>
			</form>
		</>
	);
};

export default CreateProjectPage;
