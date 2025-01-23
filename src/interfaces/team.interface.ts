import { z } from 'zod';
import { userSchema } from './auth.interface';

// User Team Project
export const teamMemberSchema = userSchema.pick({ _id: true, name: true, email: true });
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const teamProjectSchema = z.array(teamMemberSchema);
export type TeamProject = z.infer<typeof teamProjectSchema>;

export const teamMemberSearchSchema = z.object({
	username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
});
export type TeamMemberSearch = z.infer<typeof teamMemberSearchSchema>;
