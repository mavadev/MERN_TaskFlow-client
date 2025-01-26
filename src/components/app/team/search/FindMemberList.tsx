import { FindMemberItem } from './FindMemberItem';
import type { UserSimple } from '@/interfaces/user.interface';

interface FindMemberListProps {
	isPending: boolean;
	isError: boolean;
	users: UserSimple[];
}

export const FindMemberList = ({ isPending, isError, users }: FindMemberListProps) => {
	if (isPending) return <h3>Cargando...</h3>;
	if (isError) return <h3>Hubo un error al buscar los usuarios</h3>;

	if (users)
		return (
			<div className='flex flex-col gap-4 mt-10'>
				{users.length ? (
					users.map(user => (
						<FindMemberItem
							key={user._id}
							user={user}
						/>
					))
				) : (
					<div className='flex flex-col gap-2'>
						<h3 className='text-lg'>No se encontraron usuarios</h3>
						<p className='text-sm text-gray-500'>
							Puede que el usuario que buscas <span className='font-bold'>no se encuentre en la plataforma</span> o que
							ya <span className='font-bold'>sea parte del equipo</span>
						</p>
					</div>
				)}
			</div>
		);
};
