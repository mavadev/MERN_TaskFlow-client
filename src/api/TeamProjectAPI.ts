import api from '@/lib/axios';
import { responseError } from './errors';
import type { Project } from '@/interfaces/project.interface';
import type { ResponseData } from '@/interfaces/api.interface';
import { TeamProject, teamProjectSchema } from '@/interfaces/team.interface';

interface TeamProjectProps {
	projectId: Project['_id'];
}

export async function getProjectTeam({ projectId }: Pick<TeamProjectProps, 'projectId'>): Promise<TeamProject> {
	try {
		const { data } = await api.get<ResponseData>(`/projects/${projectId}/team`);

		const { success, data: team } = teamProjectSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener el equipo del proyecto');

		return team;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
