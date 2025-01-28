import { useContext, createContext } from 'react';
import type { TeamResponse } from '@/interfaces/team.interface';
import type { Project } from '@/interfaces/project.interface';

interface ProjectContextType {
	project: Project;
	team: TeamResponse;
	isManager: boolean;
}
export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

// Hook para uso de Contexto
export const useProject = () => useContext(ProjectContext);
