import { z } from 'zod';
import { userSchema } from './auth.interface';

// User Team Project
export const teamMemberSchema = userSchema.pick({ _id: true, name: true, email: true });
export type TeamMember = z.infer<typeof teamMemberSchema>;

export const teamProjectSchema = z.array(teamMemberSchema);
export type TeamProject = z.infer<typeof teamProjectSchema>;
