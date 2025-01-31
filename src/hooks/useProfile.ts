import { getProfile } from '@/api/UserAPI';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
	// Obtener usuario completo
	const {
		data: profile,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		retry: false,
	});

	if (!profile) return { profile: null, projects: null, isProfileLoading: isLoading, isProfileError: isError };

	return { profile: profile.user, projects: profile.projects, isProfileLoading: isLoading, isProfileError: isError };
};
