import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const ErrorScreen = () => {
	return (
		<div className='flex-1 flex flex-col items-center justify-center gap-5 text-xl !text-error font-semibold'>
			<ExclamationCircleIcon className='size-20' />
			<h2>No se pudo obtener la información</h2>
		</div>
	);
};
