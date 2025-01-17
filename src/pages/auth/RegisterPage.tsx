import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { CreateAccount } from '@/interfaces/auth';

const RegisterForm = () => {
	const initialValues: CreateAccount = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	};
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleRegister = (formData: CreateAccount) => {};

	return (
		<>
			<h2 className='text-4xl font-normal text-center '>Registrar Cuenta</h2>
			<form
				noValidate
				className='space-y-8 bg-white w-full max-w-md'
				onSubmit={handleSubmit(handleRegister)}>
				<div className='flex flex-col gap-3'>
					<label
						htmlFor='name'
						className='font-normal text-2xl'>
						Nombre
					</label>

					<input
						id='name'
						type='text'
						className='input-form'
						placeholder='Nombre de Registro'
						{...register('name', {
							required: 'El Nombre es obligatorio',
						})}
					/>
					{errors.name && <ErrorMessage error={errors.name.message as string}></ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='email'
						className='font-normal text-2xl'>
						Email
					</label>

					<input
						id='email'
						type='email'
						className='input-form'
						placeholder='Email de Registro'
						{...register('email', {
							required: 'El Email es obligatorio',
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'E-mail no válido',
							},
						})}
					/>
					{errors.email && <ErrorMessage error={errors.email.message as string}></ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='password'
						className='font-normal text-2xl'>
						Password
					</label>

					<input
						id='password'
						type='password'
						className='input-form'
						placeholder='Password de Registro'
						{...register('password', {
							required: 'El Password es obligatorio',
						})}
					/>
					{errors.password && <ErrorMessage error={errors.password.message as string}></ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='password_confirmation'
						className='font-normal text-2xl'>
						Confirmar Password
					</label>

					<input
						id='password_confirmation'
						type='password'
						className='input-form'
						placeholder='Confirmar Password'
						{...register('password_confirmation', {
							required: 'El Password es obligatorio',
							validate: value => value === watch('password') || 'Los passwords no coinciden',
						})}
					/>
					{errors.password_confirmation && (
						<ErrorMessage error={errors.password_confirmation.message as string}></ErrorMessage>
					)}
				</div>

				<input
					type='submit'
					value='Registrar Cuenta'
					className='bg-primary-600 hover:bg-primary-700 w-full p-3  text-white font-black  text-xl cursor-pointer'
				/>
			</form>
		</>
	);
};

export default RegisterForm;
