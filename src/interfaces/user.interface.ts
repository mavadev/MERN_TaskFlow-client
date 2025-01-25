import { z } from 'zod';

// Usuario Simple
export const userSimpleSchema = z.object({
	_id: z.string(),
	name: z.string(),
	avatar: z.string(),
	username: z.string(),
});
export const usersSimpleSchema = z.array(userSimpleSchema);
export type UserSimple = z.infer<typeof userSimpleSchema>;

// Usuario Completo
export const userSchema = userSimpleSchema.extend({
	email: z.string(),
	description: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});
export type User = z.infer<typeof userSchema>;
