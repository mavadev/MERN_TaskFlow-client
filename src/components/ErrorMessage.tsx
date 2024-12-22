export const ErrorMessage = ({ error }: { error: string }) => {
	return (
		<div className='my-4 bg-red-100 text-red-600 font-bold p-3 uppercase text-sm'>
			<p>{error}</p>
		</div>
	);
};
