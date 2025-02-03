const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Fondo
				background: 'var(--background)',
				onBackground: 'var(--on-background)',
				// Superficie
				surface: 'var(--surface)',
				onSurface: 'var(--on-surface)',
				surfaceDim: 'var(--surface-dim)',
				surfaceBright: 'var(--surface-bright)',
				surfaceContainerLowest: 'var(--surface-container-lowest)',
				surfaceContainerLow: 'var(--surface-container-low)',
				surfaceContainer: 'var(--surface-container)',
				surfaceContainerHigh: 'var(--surface-container-high)',
				surfaceContainerHighest: 'var(--surface-container-highest)',
				surfaceVariant: 'var(--surface-variant)',
				onSurfaceVariant: 'var(--on-surface-variant)',
				// Inversos
				inverseSurface: 'var(--inverse-surface)',
				inverseOnSurface: 'var(--inverse-on-surface)',
				outline: 'var(--outline)',
				outlineVariant: 'var(--outline-variant)',
				// Sombras
				shadow: 'var(--shadow)',
				scrim: 'var(--scrim)',
				surfaceTint: 'var(--surface-tint)',
				// Colores Primarios
				primary: 'var(--primary)',
				onPrimary: 'var(--on-primary)',
				primaryContainer: 'var(--primary-container)',
				onPrimaryContainer: 'var(--on-primary-container)',
				inversePrimary: 'var(--inverse-primary)',
				// Colores Secundarios
				secondary: 'var(--secondary)',
				onSecondary: 'var(--on-secondary)',
				secondaryContainer: 'var(--secondary-container)',
				onSecondaryContainer: 'var(--on-secondary-container)',
				// Colores Terciarios
				tertiary: 'var(--tertiary)',
				onTertiary: 'var(--on-tertiary)',
				tertiaryContainer: 'var(--tertiary-container)',
				onTertiaryContainer: 'var(--on-tertiary-container)',
				// Colores de Error
				error: 'var(--error)',
				onError: 'var(--on-error)',
				errorContainer: 'var(--error-container)',
				onErrorContainer: 'var(--on-error-container)',

				black: '#141414',
			},
		},
	},
	plugins: [],
};
