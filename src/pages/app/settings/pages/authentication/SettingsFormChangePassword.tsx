import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { FormChangePassword } from '@/interfaces/settings.interface';

interface SettingsFormChangePasswordProps {
	onSubmit: (formData: FormChangePassword) => void;
	isPending: boolean;
}

const SettingsFormChangePassword = ({ onSubmit, isPending }: SettingsFormChangePasswordProps) => {
	const initialValues: FormChangePassword = {
		current_password: '',
		password: '',
		password_confirmation: '',
	};
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormChangePassword>({ defaultValues: initialValues });

	return (
		<form
			noValidate
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-5 bg-white w-full max-w-md text-left'>
			<div className='flex flex-col gap-3'>
				<label
					htmlFor='current_password'
					className='font-semibold'>
					Contraseña actual
				</label>

				<input
					type='password'
					id='current_password'
					className='input-form text-sm rounded'
					placeholder='Ingresar su contraseña actual'
					{...register('current_password', {
						required: 'La contraseña actual es obligatoria',
						minLength: {
							value: 8,
							message: 'La contraseña es de al menos 8 caracteres',
						},
					})}
				/>
				{errors.current_password?.message && <ErrorMessage error={errors.current_password.message} />}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password'
					className='font-semibold'>
					Nueva Contraseña
				</label>

				<input
					id='password'
					type='password'
					className='input-form text-sm rounded'
					placeholder='Ingrese su nueva contraseña'
					{...register('password', {
						required: 'La nueva contraseña es obligatoria',
						minLength: {
							value: 8,
							message: 'La nueva contraseña debe tener al menos 8 caracteres',
						},
					})}
				/>
				{errors.password?.message && <ErrorMessage error={errors.password.message} />}
			</div>

			<div className='flex flex-col gap-3'>
				<label
					htmlFor='password_confirmation'
					className='font-semibold'>
					Confirmar Contraseña
				</label>

				<input
					id='password_confirmation'
					type='password'
					className='input-form text-sm rounded'
					placeholder='Confirmar Contraseña'
					{...register('password_confirmation', {
						required: 'La confirmación es obligatoria',
						validate: value => value === watch('password') || 'Las contraseñas no coinciden',
					})}
				/>
				{errors.password_confirmation && <ErrorMessage error={errors.password_confirmation.message as string} />}
			</div>

			<input
				type='submit'
				disabled={isPending}
				value='Cambiar Contraseña'
				className='btn btn-primary w-full !py-4'
			/>
		</form>
	);
};

export default SettingsFormChangePassword;
