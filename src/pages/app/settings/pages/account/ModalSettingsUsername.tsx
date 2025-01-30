import { Modal } from '@/components/app/modal/Modal';

const ModalSettingsUsername = () => {
	return (
		<Modal
			show={false}
			handleOnClose={() => {}}>
			<header>
				<h3 className='font-semibold p-5 text-lg text-gray-900 border-b border-gray-300'>
					Ingresa un nuevo nombre de usuario
				</h3>
			</header>
			<main>
				<form className='space-y-5 p-5'>
					<div className='flex flex-col gap-1'>
						<input
							type='text'
							id='username'
							className='input-form text-sm'
						/>
						<label
							htmlFor='username'
							className='text-sm text-gray-500'>
							Elige un nombre de usuario
						</label>
					</div>
					<button
						type='submit'
						className='btn btn-primary w-full'>
						Cambiar nombre de usuario
					</button>
				</form>
			</main>
		</Modal>
	);
};

export default ModalSettingsUsername;
