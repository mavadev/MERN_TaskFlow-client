import { Link } from 'react-router-dom';

const DashboardPage = () => {
	return (
		<>
			<header>
				<h1 className='title'>Mis Proyectos</h1>
				<p className='subtitle'>Administra tus proyectos</p>

				<nav>
					<Link
						to='/projects/create'
						className='btn-primary mt-4'>
						Nuevo Proyecto
					</Link>
				</nav>
			</header>
		</>
	);
};

export default DashboardPage;
