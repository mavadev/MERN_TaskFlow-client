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
	const [modalState, setModalState] = useState<ModalState>({ isOpen: false });

	// Función para abrir el modal
	const openModal = (mode: 'create' | 'edit' | 'view', data?: Task | TaskStatus) => {
		if (mode === 'create') setModalState({ isOpen: true, mode, data: data as TaskStatus });
		else {
			if (!data) throw new Error('Es necesario la data para esta acción');
			setModalState({ isOpen: true, mode, data: data as Task });
		}
	};

	// Función para cerrar el modal
	const closeModal = () => {
		navigate(location.pathname, { replace: true });
	};

	// React Query: Consulta de datos según ID para "edit" o "view"
	const fetchTask = () => {
		const taskId = searchParams.get('taskId')!;
		return getTask({ projectId, taskId });
	};

	const { refetch, isLoading: taskLoading } = useQuery({
		retry: false,
		enabled: false,
		queryKey: ['task', searchParams.get('taskId')],
		queryFn: fetchTask,
	});

	// Efecto para sincronizar con los SearchParams
	useEffect(() => {
		const taskId = searchParams.get('taskId')!;
		const status = searchParams.get('status') as TaskStatus;
		const mode = searchParams.get('mode') as 'create' | 'edit' | 'view';

		if (mode === 'create' && status) {
			openModal('create', status);
		} else if ((mode === 'edit' || mode === 'view') && taskId) {
			refetch().then(response => openModal(mode, response.data));
		} else {
			setModalState({ isOpen: false });
		}
	}, [searchParams, refetch]);

	// Modal dinámico
	const ModalContent = () => {
		if (!modalState.isOpen) return null;

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
				if (taskLoading) return <p>Loading...</p>;
				return (
					<TaskEditModal
						task={data}
						team={team}
					/>
				);
			case 'view':
				if (taskLoading) return <p>Loading...</p>;
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
