import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Modal } from '../../modal/Modal';
import { FindMembers } from './FindMembers';
import { getUsersByUsername } from '@/api/TeamProjectAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TeamMemberSearch } from '@/interfaces/team.interface';

export const AddTeamMemberModal = () => {
	const navigate = useNavigate();
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const location = useLocation();
	const newMember = !!new URLSearchParams(location.search).get('addMember');

	const [_, setIsPaused] = useState(false);
	const [lastSearch, setLastSearch] = useState('');
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Formulario
	const {
		watch,
		register,
		formState: { errors, isValid },
	} = useForm<TeamMemberSearch>({
		mode: 'onChange',
		defaultValues: { username: '' },
	});

	// Obtener usuarios por username
	const {
		data: users,
		isPending,
		isError,
		mutate: fetchUsers,
		isIdle,
	} = useMutation({
		mutationKey: ['search-users-team', projectId],
		mutationFn: getUsersByUsername,
	});

	const handleNewMember = () => {
		const username = watch('username');

		if (username !== lastSearch) {
			fetchUsers({ projectId, username });
			setLastSearch(username);
		}
	};

	// Detectar cuando el usuario está escribiendo
	const handleKeyDown = () => {
		setIsPaused(true);
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
	};
	const handleKeyUp = () => {
		if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
		typingTimeoutRef.current = setTimeout(async () => {
			setIsPaused(false);
			isValid && handleNewMember();
		}, 500);
	};

	const handleOnClose = () => navigate(location.pathname);

	return (
		<Modal
			show={newMember}
			handleOnClose={handleOnClose}>
			<form
				className='flex flex-col gap-2'
				onSubmit={e => e.preventDefault()}>
				<label
					htmlFor='username'
					className='text-2xl font-bold mb-3'>
					Buscar Colaborador
				</label>
				<input
					id='username'
					type='text'
					className='input-form'
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					placeholder='Ingrese el nombre de usuario del colaborador'
					{...register('username', {
						required: 'El nombre de usuario es obligatorio',
						minLength: {
							value: 3,
							message: 'El nombre de usuario debe tener al menos 3 caracteres',
						},
					})}
				/>
				{errors.username && <p className='text-sm text-gray-500 mt-2'>{errors.username.message}</p>}
			</form>
			<FindMembers
				users={users!}
				isIdle={isIdle}
				isError={isError}
				isPending={isPending}
			/>
		</Modal>
	);
};
