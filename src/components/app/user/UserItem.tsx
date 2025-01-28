import { formatImage } from '@/utils';
import type { UserSimple } from '@/interfaces/user.interface';

interface UserItemProps {
	user: UserSimple;
}

export const UserItem = ({ user }: UserItemProps) => {
	return (
		<div className='flex items-center gap-4'>
			<img
				alt={user.name}
				src={formatImage(user.avatar)}
				className='w-10 h-10 rounded-full'
			/>
			<div>
				<h3 className='text-sm font-semibold'>{user.name} </h3>
				<p className='text-sm text-gray-500'>{user.username}</p>
			</div>
		</div>
	);
};
