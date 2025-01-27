import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { getTask } from '@/api/TaskAPI';
import { Modal } from '@/components/app/modal/Modal';
import type { Project } from '@/interfaces/project.interface';
import type { TeamResponse } from '@/interfaces/team.interface';
import type { Task, TaskStatus } from '@/interfaces/task.interface';
import { TaskAddModal, TaskEditModal, TaskViewModal } from '@/components/app/tasks/modal';

// Tipos para los estados del modal
type ModalState =
	| { isOpen: false }
	| { isOpen: true; mode: 'create'; data: TaskStatus }
	| { isOpen: true; mode: 'edit' | 'view'; data: Task };

interface TaskModalProps {
	team: TeamResponse;
}

export const TaskModal = ({ team }: TaskModalProps) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const [taskId, setTaskId] = useState(searchParams.get('taskId') || null);
	const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

	// Función para abrir el modal
	const openModal = (mode: 'create' | 'edit' | 'view', data?: Task | TaskStatus) => {
		if (mode === 'create') setModalState({ isOpen: true, mode, data: data as TaskStatus });
		else {
			if (!data) {
				closeModal();
				throw new Error('Es necesario la data para esta acción');
			}
			setModalState({ isOpen: true, mode, data: data as Task });
		}
	};
	// Función para cerrar el modal
	const closeModal = () => navigate(-1);

	// React Query: Consulta de datos para "edit" o "view"
	const fetchTask = () => {
		if (!taskId) throw new Error('No se ha seleccionado una tarea');
		return getTask({ projectId, taskId });
	};

	const {
		refetch,
		data: task,
		isLoading: taskLoading,
		isError,
		error,
	} = useQuery({
		retry: false,
		enabled: !!taskId,
		queryFn: fetchTask,
		queryKey: ['task', taskId],
	});

	// Actualizar tarea
	useEffect(() => {
		setTaskId(searchParams.get('taskId') || null);

		if (modalState.isOpen && modalState.mode === 'view' && task) {
			setModalState({ ...modalState, data: task });
		}
	}, [searchParams, task]);

	// Efecto para sincronizar con los SearchParams
	useEffect(() => {
		const status = searchParams.get('status') as TaskStatus;
		const mode = searchParams.get('mode') as 'create' | 'edit' | 'view';

		if (mode === 'create' && status) {
			openModal('create', status);
		} else if ((mode === 'edit' || mode === 'view') && taskId) {
			if (task) openModal(mode, task);
			else
				refetch()
					.then(({ data: task }) => openModal(mode, task))
					.catch(() => closeModal());
		} else {
			setModalState({ isOpen: false });
		}
	}, [searchParams, refetch, taskId]);

	// Modal dinámico
	const ModalContent = () => {
		if (!modalState.isOpen) return null;

		if (isError) return <p>Error: {(error as Error).message}</p>;
		if (taskLoading) return <p>Loading...</p>;

		const { mode, data } = modalState;
		switch (mode) {
			case 'create':
				return (
					<TaskAddModal
						team={team}
						status={data}
					/>
				);
			case 'edit':
				return (
					<TaskEditModal
						task={data}
						team={team}
					/>
				);
			case 'view':
				return (
					<TaskViewModal
						task={data}
						team={team}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Modal
			show={!!modalState.isOpen}
			handleOnClose={closeModal}>
			<ModalContent />
		</Modal>
	);
};
