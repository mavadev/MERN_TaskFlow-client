import { z } from 'zod';

export const responseSchema = z.object({
	message: z.optional(z.string()),
	data: z.optional(z.any()),
});
export interface ResponseData extends z.infer<typeof responseSchema> {}
