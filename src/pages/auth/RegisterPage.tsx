import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { ErrorMessage } from '@/components/ErrorMessage';
import { createAccount } from '@/api/AuthAPI';
import type { RegisterForm } from '@/interfaces/auth.interface';

const RegisterPage = () => {
	const navigate = useNavigate();
	// Registro de datos iniciales del formulario
	const initialValues: RegisterForm = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	};

	// Hook de formulario
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: initialValues });

	// Mutación para registrar la cuenta
	const { mutate } = useMutation({
		mutationFn: createAccount,
		onSuccess: message => {
			toast.success(message);
			navigate('/auth/confirm-account', { state: { email: watch('email') } });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	// Función para registrar la cuenta
	const handleRegister = (formData: RegisterForm) => mutate(formData);

	return (
		<>
			<h2 className='text-4xl font-normal text-center '>Registrar Cuenta</h2>
			<form
				noValidate
				className='space-y-6 w-full max-w-md'
				onSubmit={handleSubmit(handleRegister)}>
				<div className='flex flex-col gap-3'>
					<label
						htmlFor='name'
						className='label-form'>
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
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='email'
						className='label-form'>
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
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='password'
						className='label-form'>
						Contraseña
					</label>

					<input
						id='password'
						type='password'
						className='input-form'
						placeholder='Password de Registro'
						{...register('password', {
							required: 'El Password es obligatorio',
							minLength: {
								value: 8,
								message: 'La contraseña debe tener al menos 8 caracteres',
							},
						})}
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='password_confirmation'
						className='label-form'>
						Confirmar Contraseña
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
					{errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
				</div>

				<button
					type='submit'
					className='btn-primary w-full p-3 text-xl'>
					Registrar Cuenta
				</button>
			</form>
			<nav className='flex flex-col space-y-4'>
				<p className='text-center'>
					¿Ya tienes cuenta?{' '}
					<Link
						to='/auth/login'
						className='text-secondary hover:opacity-90 font-bold '>
						Iniciar Sesión
					</Link>
				</p>
			</nav>
		</>
	);
};

export default RegisterPage;
