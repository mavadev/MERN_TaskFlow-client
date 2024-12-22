import { Link } from 'react-router-dom';

const DashboardPage = () => {
	return (
		<>
			<h1 className='text-3xl font-bold'>Mis Proyectos</h1>
			<p className='text-2xl font-light mt-2'>Administra tus proyectos</p>

			<Link
				to='/projects/create'
				className='bg-yellow-900 text-white py-2 px-4 rounded font-bold inline-block mt-4'>
				Nuevo Proyecto
			</Link>
		</>
	);
};

export default DashboardPage;
