import { z } from 'zod';
import { noteSchema } from './note.interface';
import { userSimpleSchema } from './user.interface';

// Estados de la tarea
const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

// Tarea Simple ( Listado de tareas )
const taskSchemaSimple = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	status: taskStatusSchema,
	assignedTo: userSimpleSchema.or(z.null()),
	createdAt: z.string(),
	project: z.string(),
});
export const tasksSchemaSimple = z.array(taskSchemaSimple);
export interface TaskSimple extends z.infer<typeof taskSchemaSimple> {}

// Tarea Completa
export const taskSchema = taskSchemaSimple.extend({
	notes: z.array(noteSchema),
});
export interface Task extends z.infer<typeof taskSchema> {}

// Tarea en estado de borrador
export const taskDraftSchema = taskSchemaSimple
	.pick({
		name: true,
		description: true,
		status: true,
	})
	.extend({ assignedTo: z.string().or(z.undefined()) });
export interface TaskDraft extends z.infer<typeof taskDraftSchema> {}
