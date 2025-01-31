import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

import { checkPassword, deleteAccount } from '@/api/SettingsAPI';
import { Modal } from '@/components/app/modal/Modal';
import type { User } from '@/interfaces/user.interface';
import type { FormDeleteAccount } from '@/interfaces/settings.interface';

interface ModalSettingsDeleteAccountProps {
	email: User['email'];
	projects: number;
}

const textDeleteAccount = 'eliminar mi cuenta';

const ModalSettingsDeleteAccount = ({ email, projects }: ModalSettingsDeleteAccountProps) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();
	const isOpen = searchParams.get('delete-account');

	const handleOnClose = () => navigate(-1);

	// Formulario
	const { register, handleSubmit } = useForm<FormDeleteAccount>();

	// Verificar contraseña
	const mutateCheckPassword = useMutation({
		mutationFn: checkPassword,
		onError: error => {
			toast.error(error.message);
		},
	});

	const mutateDeleteAccount = useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			toast.success('Adios vaquero!');
			queryClient.removeQueries({ queryKey: ['user'] });
			setTimeout(() => navigate('/'), 3000);
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteAccount = async (formDeleteAccount: FormDeleteAccount) => {
		await mutateCheckPassword.mutateAsync({ password: formDeleteAccount.password });

		if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
			await mutateDeleteAccount.mutateAsync();
		}
	};

	return (
		<Modal
			show={!!isOpen}
			handleOnClose={handleOnClose}>
			<header>
				<h3 className='font-semibold p-5 text-balance text-lg text-gray-900'>
					Estás seguro que deseas eliminar tu cuenta?
				</h3>
				<div className='flex items-center gap-2 p-5 bg-red-200 text-red-700 font-semibold'>
					<ShieldExclamationIcon className='size-6' />
					<p>Está acción es irreversible.</p>
				</div>
			</header>
			<main className='space-y-5 p-5'>
				<section className='space-y-3 border-b border-gray-300 pb-5'>
					<p>
						Esta acción <span className='font-semibold'>eliminará todos tus {projects} proyectos</span>, incluyendo sus
						tareas, notas, colaboradores de Task Flow.
					</p>
					<p className=''>
						Después de eliminar tu cuenta, <span className='font-semibold'>no podrás acceder a ella</span>.
					</p>
					<p className=''>Si estás seguro de que deseas eliminar tu cuenta, ingresa tus credenciales de acceso.</p>
				</section>
				<form
					noValidate
					className='space-y-3'
					onSubmit={handleSubmit(handleDeleteAccount)}>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Tu correo electrónico:</label>
						<input
							disabled
							id='email'
							type='email'
							value={email}
							className='input-form disabled:opacity-80'
							{...register('email')}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Tu contraseña:</label>
						<input
							id='password'
							type='password'
							className='input-form'
							{...register('password', {
								required: 'La contraseña es requerida',
							})}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor='confirmation'>
							Para verificar, escribe debajo <span className='font-semibold'>{textDeleteAccount}</span>:
						</label>
						<input
							type='text'
							id='confirmation'
							className='input-form'
							{...register('confirmation', {
								validate: value => {
									if (value !== textDeleteAccount) return 'Debes escribir "eliminar mi cuenta"';
									return true;
								},
							})}
						/>
					</div>

					<button
						type='submit'
						className='btn btn-secondary py-3 px-4 !bg-red-600 hover:!bg-red-700 w-full'>
						Eliminar cuenta
					</button>
				</form>
			</main>
		</Modal>
	);
};

export default ModalSettingsDeleteAccount;
