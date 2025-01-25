import { z } from 'zod';

// Miembro del equipo
export const teamMemberSchema = z.object({
	_id: z.string(),
	name: z.string(),
	avatar: z.string(),
	username: z.string(),
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;

// Respuesta de equipo de proyecto
export const teamResponseSchema = z.object({
	manager: teamMemberSchema,
	team: teamMembersSchema,
});
export type TeamResponse = z.infer<typeof teamResponseSchema>;

// Buscar miembro del equipo
export const teamMemberSearchSchema = z.object({
	username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
});
export type TeamMemberSearch = z.infer<typeof teamMemberSearchSchema>;
