import { responseError } from './errors';
import type { Project } from '@/interfaces/project.interface';

interface TeamProjectProps {
	projectId: Project['_id'];
}

export async function getProjectTeam({  }: Pick<TeamProjectProps, 'projectId'>) {
	try {
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
