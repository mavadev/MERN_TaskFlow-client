import { User } from '@/interfaces/auth.interface';

interface FindMemberCardProps {
	user: User;
}

export const FindMemberCard = ({ user }: FindMemberCardProps) => {
	return (
		<div className='flex items-center justify-between'>
			<div>
				<h3 className='text-lg font-bold'>{user.name}</h3>
				<p className='text-sm text-gray-500'>{user.email}</p>
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
