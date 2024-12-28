import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import DashboardPage from '@/pages/DashboardPage';
import CreateProjectPage from '@/pages/CreateProjectPage';
import EditProjectPage from '@/pages/EditProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

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
