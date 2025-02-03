import { Link } from 'react-router-dom';

export const Logo = () => {
	return (
		<Link to='/app/projects'>
			<h1 className='uppercase text-2xl md:text-3xl border-l-4 border-primary pl-2 text-primary'>
				Task<span className='font-black text-primaryContainer text-2xl'>Flow</span>
			</h1>
		</Link>
	);
};
