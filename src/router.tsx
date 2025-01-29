import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, AppLayout } from '@/layouts';

// Landing Page
import LandingPage from '@/pages/LandingPage';

// Auth Pages
import {
	LoginPage,
	RegisterPage,
	ConfirmAccount,
	RequestConfirmAccount,
	RequestNewPassword,
	ForgotPassword,
} from '@/pages/auth';

/* App Pages */
import { ProjectsPage, ProjectPage, ProjectCreatePage, ProfilePage, SettingsPage } from '@/pages/app';
// Proyecto
import { ProjectViewPage, ProjectEditPage, ProjectTeamPage } from '@/pages/app/project/pages';
import { SettingsPublicProfile, SettingsAccount } from '@/pages/app/settings/pages';
// Profile

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta Principal */}
				<Route path='/' element={<LandingPage />} />

				{/* Rutas de autenticación */}
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='login' element={<LoginPage />} />
					<Route path='register' element={<RegisterPage />} />

					<Route path='request-code' element={<RequestConfirmAccount />} />
					<Route path='confirm-account' element={<ConfirmAccount />} />

					<Route path='request-new-password' element={<RequestNewPassword />} />
					<Route path='forgot-password' element={<ForgotPassword />} />
				</Route>

				{/* Rutas Protegidas */}
				<Route path='/app' element={<AppLayout />}>
					<Route path='profile' element={<ProfilePage />} />
					<Route path='projects' element={<ProjectsPage />} />
					<Route path='projects/create' element={<ProjectCreatePage />} />
					<Route path='projects/:projectId' element={<ProjectPage />}>
						<Route index element={<ProjectViewPage />} />
						<Route path='team' element={<ProjectTeamPage />} />
						<Route path='edit' element={<ProjectEditPage />} />
					</Route>
					<Route path='settings' element={<SettingsPage />}>
						<Route path='profile' element={<SettingsPublicProfile />} />
						<Route path='account' element={<SettingsAccount />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
