import { Link } from 'react-router-dom';

export const Logo = () => {
	return (
		<Link to='/'>
			<h1 className='uppercase text-4xl border-l-4 border-l-primary-600 pl-2 text-black'>
				Task<span className='font-black text-primary-300 text-2xl'>Flow</span>
			</h1>
		</Link>
	);
};
