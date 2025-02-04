import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeletonAside = () => {
	return (
		<aside className='p-4 pb-8 bg-white flex flex-col w-full md:max-w-xs space-y-5'>
			<div>
				<Skeleton className='p-3' />
				<Skeleton className='p-3 mt-3' />
			</div>
			<header>
				<Skeleton className='h-5 !w-32 mb-2' />
				<Skeleton className='h-10' />
				<Skeleton className='mt-3 h-7' />
			</header>
			<Skeleton className='h-40' />
			<div className='flex-1 flex flex-col'>
				<div className='mt-auto flex gap-5'>
					<div className='flex-1'>
						<Skeleton
							className='!h-10'
							inline
						/>
					</div>
					<div className='flex-1'>
						<Skeleton
							className='!h-10'
							inline
						/>
					</div>
				</div>
				<div className='mt-10 flex gap-4 items-center'>
					<div>
						<Skeleton
							circle
							className='!size-12'
						/>
					</div>
					<div className='flex-1'>
						<Skeleton className='h-6 !w-36' />
						<Skeleton className='h-4 !w-20' />
					</div>
				</div>
			</div>
		</aside>
	);
};

export default LoadingSkeletonAside;
