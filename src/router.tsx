import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import { CreateProjectPage, DashboardPage, EditProjectPage, ProjectDetailsPage } from './pages';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<AppLayout />}>
					<Route
						index
						path='/'
						element={<DashboardPage />}
					/>
					<Route
						path='/projects/create'
						element={<CreateProjectPage />}
					/>
					<Route
						path='/projects/:projectId/edit'
						element={<EditProjectPage />}
					/>
					<Route
						path='/projects/:projectId'
						element={<ProjectDetailsPage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
