import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { ErrorMessage } from '@/components/ErrorMessage';
import { createAccount } from '@/api/AuthAPI';
import type { RegisterForm } from '@/interfaces/auth';

const RegisterForm = () => {
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
			navigate('/auth/login');
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
					{errors.password && <ErrorMessage error={errors.password.message as string}></ErrorMessage>}
				</div>

				<div className='flex flex-col gap-3'>
					<label
						htmlFor='password_confirmation'
						className='font-normal text-2xl'>
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
			<nav className='flex flex-col space-y-4'>
				<p className='text-center text-xl'>
					¿Ya tienes cuenta?{' '}
					<Link
						to='/auth/login'
						className='text-primary-600 hover:text-primary-700 font-bold'>
						Iniciar Sesión
					</Link>
				</p>
			</nav>
		</>
	);
};

export default RegisterForm;
