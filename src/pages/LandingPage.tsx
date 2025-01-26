import { Link } from 'react-router-dom';
import { Logo } from '@/components/LogoApp';

const LandingPage = () => {
	return (
		<div className='flex flex-col h-dvh'>
			<header className='container mx-auto my-6 flex flex-row justify-between items-center'>
				<Logo />
				<div className='flex flex-row justify-between items-center gap-4'>
					<Link
						to='/auth/login'
						className='btn btn-secondary px-4 py-2 uppercase'>
						Ingresar
					</Link>
				</div>
			</header>
			<main className='container mx-auto flex-1 flex flex-col justify-center items-center gap-10'>
				<h1 className='text-6xl font-light'>Landing Page</h1>
				<p className='text-lg text-gray-500'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
				</p>
			</main>
		</div>
	);
};

export default LandingPage;
