import api from '@/lib/axios';
import { responseError } from './errors';
import type { User } from '@/interfaces/user.interface';
import type { Project } from '@/interfaces/project.interface';
import type { ResponseData } from '@/interfaces/api.interface';
import { TeamMember, teamMembersSchema, TeamResponse, teamResponseSchema } from '@/interfaces/team.interface';

interface TeamProjectProps {
	projectId: Project['_id'];
	userId: User['_id'];
	username: User['username'];
}

export async function getProjectTeam({ projectId }: Pick<TeamProjectProps, 'projectId'>): Promise<TeamResponse> {
	try {
		const { data } = await api.get<ResponseData>(`/projects/${projectId}/team`);

		const { success, data: team } = teamResponseSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener el equipo del proyecto');

		return team;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getUsersByUsername({ projectId, username }: Pick<TeamProjectProps, 'projectId' | 'username'>): Promise<TeamMember[]> {
	try {
		const { data } = await api.post(`/projects/${projectId}/team/search`, { username });

		const { success, data: users } = teamMembersSchema.safeParse(data.data);
		if (!success) throw new Error('No se pudo obtener los usuarios');

		return users;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function addMemberToProject({ projectId, userId }: Pick<TeamProjectProps, 'projectId' | 'userId'>) {
	try {
		const { data } = await api.post(`/projects/${projectId}/team/add`, { userId });
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function deleteMemberFromProject({ projectId, userId }: Pick<TeamProjectProps, 'projectId' | 'userId'>) {
	try {
		const { data } = await api.delete(`/projects/${projectId}/team/delete/${userId}`);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
