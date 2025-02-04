import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import type { Project } from '@/interfaces/project.interface';
import type { TeamMemberSearch } from '@/interfaces/team.interface';
import { User } from '@/interfaces/user.interface';

interface IFetchUsers {
	projectId: Project['_id'];
	username: User['username'];
}

interface FormAddMember {
	fetchUsers: (_: IFetchUsers) => void;
}

const FormAddMember = ({ fetchUsers }: FormAddMember) => {
	const { projectId } = useParams() as { projectId: Project['_id'] };

	// Estado para controlar el tiempo de espera
	const [_, setIsPaused] = useState(false);
	const [lastSearch, setLastSearch] = useState('');
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Formulario para buscar usuarios
	const {
		watch,
		register,
		formState: formAddMember,
	} = useForm<TeamMemberSearch>({
		mode: 'onChange',
		defaultValues: { username: '' },
	});

	// Buscar usuarios y guardar última búsqueda
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
			formAddMember.isValid && handleNewMember();
		}, 500);
	};

	return (
		<form
			className='flex flex-col gap-2'
			onSubmit={e => e.preventDefault()}>
			<label
				htmlFor='username'
				className='text-2xl font-semibold mb-3'>
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
			{formAddMember.errors.username && (
				<p className='text-sm text-gray-500 mt-2'>{formAddMember.errors.username.message}</p>
			)}
		</form>
	);
};

export default FormAddMember;
