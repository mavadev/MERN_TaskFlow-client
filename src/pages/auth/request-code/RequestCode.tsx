import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ResendCodeForm } from '@/interfaces/auth.interface';

interface RequestCodeProps {
	email?: string;
	handleComplete: (formData: ResendCodeForm) => void;
}

const RequestCode = ({ email, handleComplete }: RequestCodeProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues: { email: email || '' } });

	return (
		<form
			className='mt-10'
			onSubmit={handleSubmit(handleComplete)}>
			<div>
				<input
					id='email'
					type='email'
					placeholder='Ingrese su correo electrónico'
					className='input-form mb-5 text-xl font-light text-center'
					{...register('email', {
						required: 'El correo electrónico es obligatorio',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'El correo electrónico no es válido',
						},
					})}
				/>
				{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
			</div>
			<input
				type='submit'
				className='btn-primary text-xl w-full p-3'
				value='Solicitar Código'
			/>
		</form>
	);
};

export default RequestCode;
