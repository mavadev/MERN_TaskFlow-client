import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { ResendCodeForm } from '@/interfaces/auth';

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
			<input
				id='email'
				type='email'
				className='input-form mb-5 text-xl font-light text-center'
				placeholder='Ingrese su correo electrónico'
				{...register('email', {
					required: 'El correo electrónico es obligatorio',
					pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: 'El correo electrónico no es válido',
					},
				})}
			/>
			{errors.email && <ErrorMessage error={errors.email.message as string} />}
			<input
				type='submit'
				className='mt-10 btn btn-secondary px-5 py-3 uppercase text-lg'
				value='Solicitar Código'
			/>
		</form>
	);
};

export default RequestCode;
