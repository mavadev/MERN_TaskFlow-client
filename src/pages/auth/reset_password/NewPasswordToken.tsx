import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';

import { ConfirmUserForm } from '@/interfaces/auth';
import { validateCodeForNewPassword } from '@/api/AuthAPI';
import { useRef, useState } from 'react';

interface NewPasswordTokenProps {
	email: string;
	setCodeCorrect: () => void;
}

const NewPasswordToken = ({ email, setCodeCorrect }: NewPasswordTokenProps) => {
	const [code, setCode] = useState('');
	const pinFieldRef = useRef<HTMLInputElement>(null);

	// Validar código para cambiar contraseña
	const { mutate } = useMutation({
		mutationFn: validateCodeForNewPassword,
		onSuccess: message => {
			toast.success(message);
			setCodeCorrect();
		},
		onError: error => {
			toast.error(error.message);
			setCode('');
			pinFieldRef.current?.focus();
		},
	});
	const handleValidateCode = (token: ConfirmUserForm['token']) => mutate({ email, token });

	return (
		<>
			<form className='mt-10 px-5 py-5 rounded bg-primary-500 flex justify-stretch gap-3 h-24 md:h-28'>
				<PinInput
					value={code}
					onChange={setCode}
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
