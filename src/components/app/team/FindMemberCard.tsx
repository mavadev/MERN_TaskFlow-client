import { UserSearch } from '@/interfaces/auth.interface';

interface FindMemberCardProps {
	user: UserSearch;
}

export const FindMemberCard = ({ user }: FindMemberCardProps) => {
	const avatar = `${import.meta.env.VITE_PUBLIC_URL}${user.avatar}`;
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<img
					src={avatar}
					alt={user.name}
					className='w-12 h-12 rounded-full'
				/>
				<div>
					<h3 className='text-lg font-bold'>{user.name} </h3>
					<p className='text-sm text-gray-500'>{user.username}</p>
				</div>
			</div>
			<button
				className='btn btn-secondary px-4 py-3'
				onClick={() => {
					console.log('Añadir Colaborador');
				}}>
				Añadir
			</button>
		</div>
	);
};
