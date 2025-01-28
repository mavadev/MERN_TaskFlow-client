import { useContext, createContext } from 'react';
import type { User } from '@/interfaces/user.interface';

interface ProfileContextType {
	profile: User;
}
export const ProfileContext = createContext<ProfileContextType>({} as ProfileContextType);

// Hook para uso de Contexto
export const useProfile = () => useContext(ProfileContext);
