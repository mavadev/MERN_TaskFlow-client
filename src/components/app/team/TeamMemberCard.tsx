import { TeamMember } from '@/interfaces/team.interface';
import { AdjustmentsHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline';

interface TeamMemberProps {
	member: TeamMember;
}

export const TeamMemberCard = ({ member }: TeamMemberProps) => {
	const avatar = `${import.meta.env.VITE_PUBLIC_URL}${member.avatar}`;
	return (
		<div className='flex flex-col gap-2 p-5 border border-gray-400 max-w-md'>
			<div className='flex items-end justify-between gap-4'>
				<div className='flex gap-2'>
					<img
						src={avatar}
						alt={member.name}
						className='w-10 h-10 rounded-full'
					/>
					<div>
						<p className='text-lg mb-1 font-semibold line-clamp-1'>{member.name}</p>
						<p className='text-sm text-gray-600'>{member.email}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<button
						onClick={() => {}}
						className='bg-slate-500 text-white p-3 rounded-full hover:bg-slate-600 transition-colors'>
						<AdjustmentsHorizontalIcon className='w-5 h-5' />
					</button>
					<button
						onClick={() => {}}
						className='bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors'>
						<TrashIcon className='w-5 h-5' />
					</button>
				</div>
			</div>
			<footer className='flex items-center gap-2'>
				<p>Rol 1</p>
				<p>Rol 2</p>
				<p>Rol 3</p>
			</footer>
		</div>
	);
};
