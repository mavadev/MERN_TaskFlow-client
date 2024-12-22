import { Link } from 'react-router-dom';

const CreateProjectPage = () => {
	return (
		<>
			<h1 className='text-3xl font-bold'>Crear Proyecto</h1>
			<p className='text-2xl font-light mt-2'>Rellena los datos para crear tu nuevo proyecto</p>

			<Link
				to='/'
				className='bg-yellow-900 text-white py-2 px-4 rounded font-bold inline-block mt-4'>
				Volver a Proyectos
			</Link>
		</>
	);
};

export default CreateProjectPage;
