import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { CreateProjectPage, DashboardPage, EditProjectPage, ProjectDetailsPage } from '@/pages/app';
import LoginPage from '@/pages/auth/LoginPage';

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
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
