import { colorThemeList, themeList } from '@/data';
import { ColorThemes, Themes } from '@/interfaces/settings.interface';

export const formatDate = (date: string) => {
	const newDate = new Date(date);
	return newDate.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export const formatImage = (pathImage: string) => {
	const completeURL = `${import.meta.env.VITE_PUBLIC_URL}${pathImage}`;
	return completeURL;
};

/* Configuración de Apariencia */

// OBTENER THEME
const DEFAULT_THEME: Themes = themeList[0].value;
export const getTheme = (): Themes => {
	const theme = localStorage.getItem('THEME') as Themes;
	if (!theme) localStorage.setItem('THEME', DEFAULT_THEME);

	return theme ? theme : DEFAULT_THEME;
};

// OBTENER COLOR THEME
const DEFAULT_COLOR_THEME: ColorThemes = colorThemeList[0].value;
export const getColorTheme = (): ColorThemes => {
	const colorTheme = localStorage.getItem('COLOR_THEME') as ColorThemes;
	if (!colorTheme) localStorage.setItem('COLOR_THEME', DEFAULT_COLOR_THEME);

	return colorTheme ? colorTheme : DEFAULT_COLOR_THEME;
};

// ESTABLECER THEME FINAL
export const setTheme = () => {
	const theme = getTheme();
	const colorTheme = getColorTheme();

	if (theme === 'system') {
		const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const themePreference = userPrefersDark ? 'dark' : 'light';
		document.documentElement.classList.value = `${themePreference} ${colorTheme}`;
	} else {
		document.documentElement.classList.value = `${theme} ${colorTheme}`;
	}
};
