import api from '@/lib/axios';
import { responseError } from './errors';
import { userSchema, User } from '@/interfaces/auth.interface';
import type { Project } from '@/interfaces/project.interface';
import type { ResponseData } from '@/interfaces/api.interface';
import { TeamProject, teamProjectSchema } from '@/interfaces/team.interface';

interface TeamProjectProps {
	projectId: Project['_id'];
	email: User['email'];
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

export async function getUserByEmail({ projectId, email }: Pick<TeamProjectProps, 'projectId' | 'email'>): Promise<User> {
	try {
		const { data } = await api.post(`/projects/${projectId}/team/find`, { email });

		const { success, data: user } = userSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener el usuario');

		return user;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
