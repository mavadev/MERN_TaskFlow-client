import { z } from 'zod';

export const responseSchema = z.object({
	message: z.string(),
	data: z.any(),
});
export interface ResponseData extends z.infer<typeof responseSchema> {}
