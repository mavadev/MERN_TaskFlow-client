import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { Modal } from '../modal/Modal';
import { FindMemberCard } from './FindMemberCard';
import { getUserByEmail } from '@/api/TeamProjectAPI';
import type { TeamMemberSearch } from '@/interfaces/team.interface';
import type { Project } from '@/interfaces/project.interface';

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
		formState: { isValid },
	} = useForm<TeamMemberSearch>({
		mode: 'onChange',
		defaultValues: { email: '' },
	});

	// Obtener usuario por email
	const {
		data: user,
		isPending,
		isError,
		mutate,
	} = useMutation({
		mutationFn: getUserByEmail,
	});

	const handleNewMember = () => {
		const email = watch('email');

		if (email !== lastSearch) {
			mutate({ projectId, email });
			setLastSearch(email);
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
			<form className='flex flex-col mb-10'>
				<label
					htmlFor='email'
					className='text-2xl font-bold mb-3'>
					Buscar colaborador
				</label>
				<input
					id='email'
					type='email'
					className='input-form'
					onKeyUp={handleKeyUp}
					onKeyDown={handleKeyDown}
					placeholder='Ingrese el email del colaborador'
					{...register('email', {
						required: 'El email es obligatorio',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'El email no es válido',
						},
					})}
				/>
			</form>
			{isPending ? (
				<h3>Cargando...</h3>
			) : isError ? (
				<h3>No se encontró el usuario</h3>
			) : (
				user && <FindMemberCard user={user} />
			)}
		</Modal>
	);
};
