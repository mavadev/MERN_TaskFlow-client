import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/ProjectAPI';

const EditProjectPage = () => {
	const { projectId } = useParams();

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['project'],
		queryFn: () => getProjectById(projectId!),
	});

	console.log({ data, isLoading, isError, error });

	return <div>EditProjectPage</div>;
};

export default EditProjectPage;
