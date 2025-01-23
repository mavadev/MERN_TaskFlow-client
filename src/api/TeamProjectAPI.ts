import api from '@/lib/axios';
import { responseError } from './errors';
import type { Project } from '@/interfaces/project.interface';
import type { ResponseData } from '@/interfaces/api.interface';
import { teamProjectSchema } from '@/interfaces/team.interface';
import { UserSearch, usersSearchSchema } from '@/interfaces/auth.interface';

interface TeamProjectProps {
	projectId: Project['_id'];
	username: UserSearch['username'];
	userId: UserSearch['_id'];
}

export async function getProjectTeam({ projectId }: Pick<TeamProjectProps, 'projectId'>) {
	try {
		const { data } = await api.get<ResponseData>(`/projects/${projectId}/team`);

		const { success, data: team } = teamProjectSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener el equipo del proyecto');

		return team;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getUsersByUsername({ projectId, username }: Pick<TeamProjectProps, 'projectId' | 'username'>) {
	try {
		const { data } = await api.post(`/projects/${projectId}/team/search`, { username });

		const { success, data: users } = usersSearchSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener los usuarios');

		return users;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function addMemberToProject({ projectId, userId }: Pick<TeamProjectProps, 'projectId' | 'userId'>) {
	try {
		const { data } = await api.post(`/projects/${projectId}/team/addMember`, { userId });
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
