import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthLayout from '@/layouts/AuthLayout';
import {
	LoginPage,
	RegisterPage,
	ConfirmAccount,
	RequestConfirmAccount,
	RequestNewPassword,
	ForgotPassword,
} from '@/pages/auth';

import AppLayout from '@/layouts/AppLayout';
import { CreateProjectPage, DashboardPage, EditProjectPage, ProjectDetailsPage, TeamProjectPage } from '@/pages/app';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='login' element={<LoginPage />}/>
					<Route path='register' element={<RegisterPage />}/>

					<Route path='request-code' element={<RequestConfirmAccount />}/>
					<Route path='confirm-account' element={<ConfirmAccount />}/>

					<Route path='request-new-password' element={<RequestNewPassword />}/>
					<Route path='forgot-password' element={<ForgotPassword />}/>
				</Route>
				<Route path='/' element={<AppLayout />}>
					<Route index element={<DashboardPage />}/>
					<Route path='projects/create' element={<CreateProjectPage />}/>
					<Route path='projects/:projectId' element={<ProjectDetailsPage />}/>
					<Route path='projects/:projectId/team' element={<TeamProjectPage />}/>
					<Route path='projects/:projectId/edit' element={<EditProjectPage />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
