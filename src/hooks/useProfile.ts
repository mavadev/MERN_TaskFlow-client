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

	return { profile, isProfileLoading: isLoading, isProfileError: isError };
};
