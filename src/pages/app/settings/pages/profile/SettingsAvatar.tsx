import { formatImage } from '@/utils';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface SettingsAvatarProps {
	avatar: string;
	username: string;
}

const SettingsAvatar = ({ avatar, username }: SettingsAvatarProps) => {
	return (
		<div className='flex-1 space-y-5 text-center'>
			<h3 className='text-lg font-semibold mb-3 text-left md:text-center'>Foto de Perfil</h3>
			<div className='flex md:flex-col gap-5'>
				<div className='w-28 h-28 relative rounded-full overflow-hidden mx-auto'>
					<img
						alt={username}
						src={formatImage(avatar)}
						className='w-full h-full object-cover'
					/>
					<button
						onClick={() => {}}
						className='absolute inset-0 opacity-0 hover:opacity-100 bg-black/50 flex items-center justify-center transition-opacity duration-300'>
						<ArrowUpTrayIcon className='size-6 text-white' />
					</button>
				</div>
				<div className='flex-1 flex flex-col items-stretch justify-center gap-5'>
					<button
						onClick={() => {}}
						className='btn btn-secondary px-4 py-2 text-sm block md:hidden'>
						Actualizar foto
					</button>
					<button
						onClick={() => {}}
						className='btn btn-secondary px-4 py-2 text-sm block'>
						Remover foto
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsAvatar;
