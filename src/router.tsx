import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';
import { LoginPage, RegisterPage, ConfirmAccount, RequestCode, RequestNewPassword, ForgotPassword } from '@/pages/auth';

import AppLayout from '@/layouts/AppLayout';
import { CreateProjectPage, DashboardPage, EditProjectPage, ProjectDetailsPage } from '@/pages/app';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AppLayout />}>
					<Route index element={<DashboardPage />} />
					<Route path='/projects/create' element={<CreateProjectPage />} />
					<Route path='/projects/:projectId/edit' element={<EditProjectPage />} />
					<Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
				</Route>
				<Route element={<AuthLayout />}>
					<Route path='/auth/login' element={<LoginPage />} />
					<Route path='/auth/register' element={<RegisterPage />} />

					<Route path='/auth/request-code' element={<RequestCode />} />
					<Route path='/auth/confirm-account' element={<ConfirmAccount />} />

					<Route path='/auth/request-new-password' element={<RequestNewPassword />} />
					<Route path='/auth/forgot-password' element={<ForgotPassword />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
