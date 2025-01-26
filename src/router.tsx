import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, AppLayout } from '@/layouts';
// Auth Pages
import {
	LoginPage,
	RegisterPage,
	ConfirmAccount,
	RequestConfirmAccount,
	RequestNewPassword,
	ForgotPassword,
} from '@/pages/auth';

// App Pages
import { ProjectsPage, CreateProjectPage, ProjectDetailsPage } from '@/pages/app';
import { ProjectViewPage, ProjectEditPage, ProjectTeamPage } from '@/pages/app/project';

// Landing Page
import LandingPage from '@/pages/LandingPage';

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta Principal */}
				<Route path='/' element={<LandingPage />} />

				{/* Rutas de autenticación */}
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='login' element={<LoginPage />}/>
					<Route path='register' element={<RegisterPage />}/>

					<Route path='request-code' element={<RequestConfirmAccount />}/>
					<Route path='confirm-account' element={<ConfirmAccount />}/>

					<Route path='request-new-password' element={<RequestNewPassword />}/>
					<Route path='forgot-password' element={<ForgotPassword />}/>
				</Route>

				{/* Rutas Protegidas */}
				<Route path='/app' element={<AppLayout />}>
					<Route path='projects' element={<ProjectsPage />}/>
					<Route path='projects/create' element={<CreateProjectPage />}/>
					<Route path='projects/:projectId' element={<ProjectDetailsPage />}>
						<Route index element={<ProjectViewPage />}/>
						<Route path='team' element={<ProjectTeamPage />}/>
						<Route path='edit' element={<ProjectEditPage />}/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
