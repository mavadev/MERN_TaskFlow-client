export const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<div className='bg-red-600 text-red-100 font-bold p-3 uppercase text-sm'>
			<p>{error}</p>
		</div>
	);
};
