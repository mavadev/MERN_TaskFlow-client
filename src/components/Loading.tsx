import { GridLoader } from 'react-spinners';

export const Loading = () => {
	return (
		<div className='flex-1 grid place-content-center'>
			<GridLoader
				size={25}
				loading={true}
				color='var(--primary)'
				aria-label='Loading Spinner'
			/>
		</div>
	);
};
