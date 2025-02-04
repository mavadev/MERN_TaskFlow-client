import { SyncLoader } from 'react-spinners';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { FindMemberItem } from './FindMemberItem';
import type { UserSimple } from '@/interfaces/user.interface';

interface FindMemberListProps {
	disabled: boolean;
	users: UserSimple[];
	usersError: boolean;
	usersLoading: boolean;
}

const LoadingUsers = () => (
	<SyncLoader
		color='var(--primary)'
		className='text-center mt-10'
	/>
);

const ErrorUsers = () => (
	<div className='flex items-center gap-5'>
		<ExclamationCircleIcon className='size-10 text-error' />
		<h3 className='font-semibold text-error'>Hubo un error al obtener los usuarios</h3>
	</div>
);

const NotFoundUsers = () => (
	<div className='flex gap-5'>
		<InformationCircleIcon className='size-10' />
		<div className='space-y-2'>
			<h3 className='font-semibold'>No se encontraron usuarios</h3>
			<p className='text-sm text-black'>
				Puede que el usuario que buscas <span className='font-bold'>no se encuentre en la plataforma</span> o que ya{' '}
				<span className='font-bold'>sea parte del equipo</span>
			</p>
		</div>
	</div>
);

export const FindMemberList = ({ disabled, users, usersError, usersLoading }: FindMemberListProps) => {
	if (disabled) return <></>;

	if (usersLoading) return <LoadingUsers />;
	if (usersError) return <ErrorUsers />;

	if (!users?.length) return <NotFoundUsers />;

	return (
		<div className='flex flex-col gap-4'>
			{users.map(user => (
				<FindMemberItem
					key={user._id}
					user={user}
				/>
			))}
		</div>
	);
};
