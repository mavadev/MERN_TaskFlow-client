import { useContext } from 'react';
import { formatDate, formatImage } from '@/utils';
import { ProfileContext } from '../SettingsContext';

const SettingsProfile = () => {
	const { profile } = useContext(ProfileContext);

	return (
		<main className='space-y-5 p-5'>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Avatar</h3>
				<img
					alt={profile.name}
					src={formatImage(profile.avatar)}
					className='w-20 h-w-20 rounded-full'
				/>
			</div>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Nombre</h3>
				<p className='text-lg'>{profile.name}</p>
			</div>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Username</h3>
				<p className='text-lg'>{profile.username}</p>
			</div>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Correo</h3>
				<p className='text-lg'>{profile.email}</p>
			</div>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Descripción</h3>
				<p className='text-lg'>{profile.description}</p>
			</div>
			<div>
				<h3 className='text-xl font-semibold uppercase mb-3'>Creado el</h3>
				<p className='text-lg'>{formatDate(profile.createdAt)}</p>
			</div>
			{profile.createdAt !== profile.updatedAt && (
				<div>
					<h3 className='text-xl font-semibold uppercase mb-3'>Actualizado el</h3>
					<p className='text-lg'>{formatDate(profile.updatedAt)}</p>
				</div>
			)}
		</main>
	);
};

export default SettingsProfile;
