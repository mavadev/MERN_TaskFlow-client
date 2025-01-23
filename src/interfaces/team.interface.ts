import { z } from 'zod';
import { userSchema } from './auth.interface';

// User Team Project
export const teamMemberSchema = userSchema.pick({ _id: true, name: true, email: true });
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const teamProjectSchema = z.array(teamMemberSchema);
export type TeamProject = z.infer<typeof teamProjectSchema>;

export const teamMemberSearchSchema = z.object({
	email: z.string().email('El email no es válido'),
});
export type TeamMemberSearch = z.infer<typeof teamMemberSearchSchema>;
