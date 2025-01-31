import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import { User, userSchema, UserSimple, userSimpleSchema } from '@/interfaces/user.interface';
import { ProjectsResponseConfig, projectsResponseConfigSchema } from '@/interfaces/project.interface';

interface ProfileResponse {
	user: User;
	projects: ProjectsResponseConfig;
}

export async function getProfile(): Promise<ProfileResponse> {
	try {
		const url = '/user';
		const {
			data: { data },
		} = await api.get<ResponseData>(url);

		// Validar el usuario
		const { success, data: user } = userSchema.safeParse(data.user);
		if (!success) throw new Error('Error al obtener el usuario');

		// Validar los proyectos
		const { success: successProjects, data: projects } = projectsResponseConfigSchema.safeParse(data.projects);
		if (!successProjects) throw new Error('Error al obtener los proyectos');

		return { user, projects };
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function userValidate(): Promise<UserSimple> {
	try {
		const url = '/user/validate';
		const { data } = await api.get<ResponseData>(url);

		const { success, data: user } = userSimpleSchema.safeParse(data.data);
		if (!success) throw new Error('Error al obtener el usuario');

		return user;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
