import { useQuery } from '@tanstack/react-query';
import { userValidate } from '@/api/AuthAPI';

export const useAuth = () => {
	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		retry: false,
		queryKey: ['user'],
		queryFn: userValidate,
		refetchOnWindowFocus: false,
	});

	if (isError) localStorage.removeItem('AUTH_TOKEN');

	return { user, isLoading, isError };
};
