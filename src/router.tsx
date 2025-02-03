import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { setTheme } from './utils';
import { AuthLayout, AppLayout } from '@/layouts';
import type { Themes } from './interfaces/settings.interface';

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
// Configuración
import {
	SettingsProfile,
	SettingsAccount,
	SettingsPreferences,
	SettingsAuthentication,
	SettingsProjects,
} from '@/pages/app/settings/pages';
// Proyectos
import { ProjectsCollaborative, ProjectsManaged } from './pages/app/projects';

export default function AppRouter() {
	useEffect(() => setTheme(), []);

	return (
		<BrowserRouter>
			<Routes>
				{/* Ruta Principal */}
				<Route
					path='/'
					element={<LandingPage />}
				/>

				{/* Rutas de autenticación */}
				<Route
					path='/auth'
					element={<AuthLayout />}>
					<Route
						path='login'
						element={<LoginPage />}
					/>
					<Route
						path='request-code'
						element={<RequestConfirmAccount />}
					/>
					<Route
						path='confirm-account'
						element={<ConfirmAccount />}
					/>

					<Route
						path='register'
						element={<RegisterPage />}
					/>
					<Route
						path='request-new-password'
						element={<RequestNewPassword />}
					/>
					<Route
						path='forgot-password'
						element={<ForgotPassword />}
					/>
				</Route>

				{/* Rutas Protegidas */}
				<Route
					path='/app'
					element={<AppLayout />}>
					{/* Proyectos */}
					<Route
						index
						element={
							<Navigate
								to='projects'
								replace
							/>
						}
					/>
					<Route
						path='projects'
						element={<ProjectsPage />}>
						<Route
							index
							element={
								<Navigate
									replace
									to='managed'
								/>
							}
						/>
						<Route
							path='managed'
							element={<ProjectsManaged />}
						/>
						<Route
							path='team'
							element={<ProjectsCollaborative />}
						/>
					</Route>
					<Route
						path='projects/create'
						element={<ProjectCreatePage />}
					/>
					<Route
						path='projects/:projectId'
						element={<ProjectPage />}>
						<Route
							index
							element={<ProjectViewPage />}
						/>
						<Route
							path='team'
							element={<ProjectTeamPage />}
						/>
						<Route
							path='edit'
							element={<ProjectEditPage />}
						/>
					</Route>
					{/* Perfil / Configuración */}
					<Route
						path='profile'
						element={<ProfilePage />}
					/>
					<Route
						path='settings'
						element={<SettingsPage />}>
						<Route
							index
							element={
								<Navigate
									to='profile'
									replace
								/>
							}
						/>
						<Route
							path='profile'
							element={<SettingsProfile />}
						/>
						<Route
							path='account'
							element={<SettingsAccount />}
						/>
						<Route
							path='preferences'
							element={<SettingsPreferences />}
						/>
						<Route
							path='authentication'
							element={<SettingsAuthentication />}
						/>
						<Route
							path='projects'
							element={<SettingsProjects />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
