import { User } from '@/interfaces/user.interface';

interface SettingsFormProfileProps {
	profile: User;
}

const SettingsFormProfile = ({ profile }: SettingsFormProfileProps) => {
	return (
		<form className='flex-[2] space-y-5'>
			<div className='flex flex-col'>
				<label
					htmlFor='name'
					className='font-semibold mb-2'>
					Nombre
				</label>
				<input
					id='name'
					type='text'
					defaultValue={profile.name}
					className='border border-gray-300 rounded text-sm p-2'
				/>
				<span className='text-sm text-gray-500 mt-1'>Nombre que se mostrará en tu perfil público.</span>
			</div>
			<div className='flex flex-col'>
				<label
					htmlFor='email'
					className='font-semibold mb-2'>
					Correo
				</label>
				<input
					id='email'
					type='email'
					defaultValue={profile.email}
					className='border border-gray-300 rounded text-sm p-2'
				/>
				<span className='text-sm text-gray-500 mt-1'>Correo electrónico que se mostrará en tu perfil público.</span>
			</div>
			<div className='flex flex-col'>
				<label
					htmlFor='description'
					className='font-semibold mb-2'>
					Descripción
				</label>
				<textarea
					rows={3}
					id='description'
					className='resize-none border border-gray-300 rounded text-sm p-2'
					defaultValue={profile.description}
				/>
				<span className='text-sm text-gray-500 mt-1'>Descripción que se mostrará en tu perfil público.</span>
			</div>
			<button
				type='submit'
				className='btn btn-primary w-full md:w-max'>
				Actualizar perfil
			</button>
		</form>
	);
};

export default SettingsFormProfile;
