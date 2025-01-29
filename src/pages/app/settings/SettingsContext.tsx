import { useContext, createContext } from 'react';
import type { User } from '@/interfaces/user.interface';

interface ProfileContextType {
	profile: User;
}
export const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);
