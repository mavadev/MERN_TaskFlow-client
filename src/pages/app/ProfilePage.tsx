import { formatImage } from '@/utils';
import { Loading } from '@/components/Loading';
import { useProfile } from '@/hooks/useProfile';
import { ErrorScreen } from '@/components/ErrorScreen';

const ProfilePage = () => {
	// Obtener usuario completo
	const { profile, isProfileLoading, isProfileError } = useProfile();

	if (isProfileLoading) return <Loading />;
	if (isProfileError || !profile) return <ErrorScreen />;

	return (
		<main className='my-10 space-y-5 max-w-md mx-auto text-center'>
			<img
				alt={profile.username}
				src={formatImage(profile.avatar)}
				className='size-24 rounded-full mx-auto'
			/>
			<div className='space-y-2'>
				<p className='text-xl font-semibold'>{profile.username}</p>
				<h1 className='text-3xl font-light'>{profile.name}</h1>
				<p className='text-lg font-light'>( {profile.email} )</p>
			</div>
			<p>{profile.description}</p>
		</main>
	);
};

export default ProfilePage;
