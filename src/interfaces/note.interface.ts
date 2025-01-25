import { z } from 'zod';

export const noteSchema = z.object({
	_id: z.string(),
	content: z.string(),
	createdAt: z.string(),
});
export interface Note extends z.infer<typeof noteSchema> {}
