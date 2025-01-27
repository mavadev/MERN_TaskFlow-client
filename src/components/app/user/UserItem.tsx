import { UserSimple } from '@/interfaces/user.interface';

interface UserItemProps {
	user: UserSimple;
}

export const UserItem = ({ user }: UserItemProps) => {
	const avatar = `${import.meta.env.VITE_PUBLIC_URL}${user.avatar}`;

	return (
		<div className='flex items-center gap-4'>
			<img
				src={avatar}
				alt={user.name}
				className='w-10 h-10 rounded-full'
			/>
			<div>
				<h3 className='text-sm font-semibold'>{user.name} </h3>
				<p className='text-sm text-gray-500'>{user.username}</p>
			</div>
		</div>
	);
};
