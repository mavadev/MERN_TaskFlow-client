export const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<div className='bg-red-100 text-red-600 font-bold p-3 uppercase text-sm'>
			<p>{error}</p>
		</div>
	);
};
