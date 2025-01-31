import { createContext } from 'react';
import type { User } from '@/interfaces/user.interface';
import type { ProjectsResponseConfig } from '@/interfaces/project.interface';

interface ProfileContextType {
	profile: User;
	projects: ProjectsResponseConfig;
}
export const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
