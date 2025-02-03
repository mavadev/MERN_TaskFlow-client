import { useState } from 'react';
import { toast } from 'react-toastify';
import ModalValidateAuth from '@/components/app/ModalValidateAuth';

export const usePasswordConfirm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [resolvePromise, setResolvePromise] = useState<(() => void) | null>(null);
	const [rejectPromise, setRejectPromise] = useState<(() => void) | null>(null);

	const confirmPassword = () => {
		return new Promise<void>((resolve, reject) => {
			setResolvePromise(() => resolve);
			setRejectPromise(() => reject);
			setIsOpen(true);
		});
	};

	const handleSuccess = () => {
		if (resolvePromise) resolvePromise();
		toast.success('Acción Confirmada');
		setIsOpen(false);
	};

	const handleError = () => {
		if (rejectPromise) rejectPromise();
		toast.success('Permiso Denegado');
		setIsOpen(false);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const ModalAuth = (
		<ModalValidateAuth
			show={isOpen}
			handleError={handleError}
			handleClose={handleClose}
			handleSuccess={handleSuccess}
		/>
	);

	return { confirmPassword, ModalAuth };
};
