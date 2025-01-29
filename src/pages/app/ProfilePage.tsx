import { useProfile } from '@/hooks/useProfile';
import { formatImage } from '@/utils';

const ProfilePage = () => {
	const { profile, isProfileLoading, isProfileError } = useProfile();

	if (isProfileLoading) return <h3>Cargando perfil...</h3>;
	if (isProfileError || !profile) return <h2>Error</h2>;

	return (
		<main className='space-y-5 max-w-md mx-auto text-center'>
			<img
				alt={profile.username}
				src={formatImage(profile.avatar)}
				className='h-28 w-4h-28 rounded-full mx-auto'
			/>
			<div className='space-y-2'>
				<h2 className='text-3xl font-light text-gray-600'>Perfil</h2>
				<h1 className='text-4xl font-light text-balance'>{profile.name}</h1>
				<p className='text-xl font-light text-gray-800'>( {profile.username} )</p>
			</div>
			<p>{profile.description}</p>
		</main>
	);
};

export default ProfilePage;
