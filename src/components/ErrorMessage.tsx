import { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
	return <p className='text-error font-semibold uppercase text-sm'>{children}</p>;
};
