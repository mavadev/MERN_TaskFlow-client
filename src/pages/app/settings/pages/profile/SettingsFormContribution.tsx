import { toast } from 'react-toastify';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCollaboration } from '@/api/SettingsAPI';
import type { User } from '@/interfaces/user.interface';
import type { SettingsContribution } from '@/interfaces/settings.interface';

interface SettingsContributionProps {
	profile: User;
}

const SettingsFormContribution = ({ profile }: SettingsContributionProps) => {
	const initialValues: SettingsContribution = {
		collaborate: profile.allowCollaborate,
		collaborators: profile.allowCollaborators,
	};

	const queryClient = useQueryClient();
	const [changes, setChanges] = useState(false);
	const [contribution, setContribution] = useState<SettingsContribution>(initialValues);

	useEffect(() => {
		setChanges(verifyChangesState(initialValues));
	}, [profile]);

	// Mutación de Contribución
	const { mutate, isPending } = useMutation({
		mutationFn: updateCollaboration,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const verifyChangesState = (state: SettingsContribution) =>
		state.collaborate !== initialValues.collaborate || state.collaborators !== initialValues.collaborators;

	// Actualizar campos de checked
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newState = { ...contribution, [e.target.id]: e.target.checked };
		setContribution(newState);
		setChanges(verifyChangesState(newState));
	};

	// Actualizar estado de contribuciones
	const handleCollaboration = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (changes) mutate(contribution);
	};

	return (
		<form
			noValidate
			className='space-y-5'
			onSubmit={e => handleCollaboration(e)}>
			<div className='space-y-5'>
				<div>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='collaborate'
							className='size-4'
							onChange={handleChange}
							checked={contribution.collaborate}
						/>
						<label htmlFor='collaborate'>Permitir ser contribuidor de proyectos</label>
					</div>
					<p className='text-sm text-gray-500 mt-1'>Permite que otros usuarios te agreguen a sus proyectos.</p>
				</div>
				<div>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='collaborators'
							className='size-4'
							onChange={handleChange}
							checked={contribution.collaborators}
						/>
						<label htmlFor='collaborators'>Permitir contribuidores en proyectos</label>
					</div>
					<p className='text-sm text-gray-500 mt-1'>Permite que otros usuarios puedan contribuir a tus proyectos.</p>
				</div>
			</div>
			<button
				type='submit'
				disabled={!changes}
				defaultChecked={contribution.collaborators}
				className={`btn-primary w-full md:w-max px-4 py-2 disabled:opacity-75 disabled:cursor-default`}>
				{isPending ? 'Actualizando...' : 'Actualizar Contribución'}
			</button>
		</form>
	);
};

export default SettingsFormContribution;
