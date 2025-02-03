import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonProjects = () => {
	return (
		<ul
			role='list'
			className='mb-10 grid grid-cols-1 md:grid-cols-2 gap-5'>
			{Array(8)
				.fill(null)
				.map(() => (
					<Skeleton
						height={200}
						className='max-w-md bg-secondary'
					/>
				))}
		</ul>
	);
};
