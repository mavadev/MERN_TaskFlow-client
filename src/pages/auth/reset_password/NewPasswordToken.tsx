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
			<form className='mt-10 p-5 rounded flex justify-stretch gap-3 h-24 md:h-28'>
				<PinInput
					value={token}
					placeholder='-'
					onChange={setToken}
					onComplete={handleValidateCode}>
					<PinInputField
						ref={pinFieldRef}
						className='pin-input-field'
					/>
					<PinInputField className='pin-input-field' />
					<PinInputField className='pin-input-field' />
					<PinInputField className='pin-input-field' />
					<PinInputField className='pin-input-field' />
					<PinInputField className='pin-input-field' />
				</PinInput>
			</form>
			<p className='mt-5 text-right'>
				¿No recibiste el código?{' '}
				<Link
					state={{ email }}
					to='/auth/request-new-password'
					className='font-bold text-secondary hover:opacity-90 uppercase'>
					Solicitar código
				</Link>
			</p>
		</>
	);
};

export default NewPasswordToken;
