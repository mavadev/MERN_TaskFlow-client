import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ProjectFormData } from '@/interfaces';
import ProjectForm from '@/components/projects/ProjectForm';

const CreateProjectPage = () => {
	const initialValues: ProjectFormData = {
		clientName: '',
		projectName: '',
		description: '',
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleForm = (data: ProjectFormData) => {
		console.log(data);
	};

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
					onSubmit={handleSubmit(handleForm)}
					className='mt-10 bg-white shadow-lg p-10 rounded-lg w-full max-w-3xl'>
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
