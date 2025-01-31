import { Modal } from '@/components/app/modal/Modal';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

import type { User } from '@/interfaces/user.interface';

interface ModalSettingsDeleteAccountProps {
	email: User['email'];
	projects: number;
}

const ModalSettingsDeleteAccount = ({ email, projects }: ModalSettingsDeleteAccountProps) => {
	return (
		<Modal
			show={false}
			handleOnClose={() => {}}>
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
					className='space-y-3'>
					<div className='flex flex-col gap-1'>
						<label htmlFor='email'>Tu correo electrónico:</label>
						<input
							id='email'
							type='email'
							className='input-form'
							defaultValue={email}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='password'>Tu contraseña:</label>
						<input
							id='password'
							type='password'
							className='input-form'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='confirmation'>
							Para verificar, escribe debajo <span className='font-semibold'>eliminar mi cuenta</span>:
						</label>
						<input
							type='text'
							id='confirmation'
							className='input-form'
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
