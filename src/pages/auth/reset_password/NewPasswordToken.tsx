import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

import { validateCodePassword } from '@/api/AuthAPI';
import type { ConfirmUserForm } from '@/interfaces/auth.interface';

interface NewPasswordTokenProps {
	email: ConfirmUserForm['email'];
	token: ConfirmUserForm['token'];
	setToken: (token: ConfirmUserForm['token']) => void;
	setCodeCorrect: () => void;
}

const NewPasswordToken = ({ email, token, setToken, setCodeCorrect }: NewPasswordTokenProps) => {
	const pinFieldRef = useRef<HTMLInputElement>(null);

	// Validar código para cambiar contraseña
	const { mutate } = useMutation({
		mutationFn: validateCodePassword,
		onSuccess: message => {
			toast.success(message);
			setCodeCorrect();
		},
		onError: error => {
			setToken('');
			toast.error(error.message);
			pinFieldRef.current?.focus();
		},
	});
	const handleValidateCode = (token: ConfirmUserForm['token']) => mutate({ email, token });

	return (
		<>
			<form className='mt-10 px-5 py-5 rounded bg-primary-500 flex justify-stretch gap-3 h-24 md:h-28'>
				<PinInput
					value={token}
					onChange={setToken}
					onComplete={handleValidateCode}>
					<PinInputField
						ref={pinFieldRef}
						className='w-full h-full text-center text-2xl font-bold rounded border-gray-300'
					/>
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
					<PinInputField className='w-full h-full text-center text-2xl font-bold rounded border-gray-300' />
				</PinInput>
			</form>
			<p className='mt-5 text-right'>
				¿No recibiste el código?{' '}
				<Link
					state={{ email }}
					to='/auth/request-new-password'
					className='font-bold text-primary-600 hover:text-primary-700 uppercase'>
					Solicitar código
				</Link>
			</p>
		</>
	);
};

export default NewPasswordToken;
