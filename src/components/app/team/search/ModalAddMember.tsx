import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '../../modal/Modal';
import FormAddMember from './FormAddMember';
import { FindMemberList } from './FindMemberList';
import { getUsersByUsername } from '@/api/TeamProjectAPI';

export const ModalAddMember = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const addMember = !!new URLSearchParams(location.search).get('addMember');

	// Obtener usuarios por username
	const {
		isIdle,
		data: users,
		isError: usersError,
		isPending: usersLoading,
		mutate: getUsers,
	} = useMutation({
		mutationFn: getUsersByUsername,
	});

	const handleOnClose = () => navigate(location.pathname, { replace: true });

	return (
		<Modal
			show={addMember}
			handleOnClose={handleOnClose}>
			<div className='p-10 space-y-10'>
				<FormAddMember fetchUsers={getUsers} />
				<FindMemberList
					disabled={isIdle}
					users={users!}
					usersError={usersError}
					usersLoading={usersLoading}
				/>
			</div>
		</Modal>
	);
};
