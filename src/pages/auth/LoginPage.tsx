import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { LoginForm } from '@/interfaces/auth';
import { Link } from 'react-router-dom';

const LoginForm = () => {
	const initialValues: LoginForm = {
		email: '',
		password: '',
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	const handleLogin = (formData: LoginForm) => {};

	return (
		<>
			<h2 className='text-4xl font-normal text-center '>Iniciar Sesión</h2>
			<form
				noValidate
				className='space-y-8 bg-white w-full max-w-md'
				onSubmit={handleSubmit(handleLogin)}>
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
						Contraseña
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

				<input
					type='submit'
					value='Iniciar Sesión'
					className='bg-primary-600 hover:bg-primary-700 w-full p-3 text-white font-bold text-xl cursor-pointer'
				/>
			</form>

			<nav className='flex flex-col space-y-4'>
				<p className='text-center text-xl'>
					¿No tienes cuenta?{' '}
					<Link
						to='/auth/register'
						className='text-primary-600 hover:text-primary-700 font-bold'>
						Crear cuenta
					</Link>
				</p>
			</nav>
		</>
	);
};

export default LoginForm;
