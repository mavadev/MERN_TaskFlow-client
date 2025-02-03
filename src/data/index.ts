import type { ColorTheme, Theme } from '@/interfaces/settings.interface';

export const themeList: Theme[] = [
	{ name: 'Sistema', value: 'system', color: '#FFB85C' },
	{ name: 'Claro', value: 'light', color: '#f1f5f9' },
	{ name: 'Oscuro', value: 'dark', color: '#141414' },
];

export const colorThemeList: ColorTheme[] = [
	{ name: 'Naranja', color: '#F99200', value: 'orange' },
	{ name: 'Cyan', color: '#00E3E3', value: 'cyan' },
	{ name: 'Rojo', color: '#FF4641', value: 'red' },
	{ name: 'Azul', color: '#126EFF', value: 'blue' },
	{ name: 'Morado', color: '#8C73FD', value: 'purple' },
	{ name: 'Verde', color: '#70CC17', value: 'green' },
];
