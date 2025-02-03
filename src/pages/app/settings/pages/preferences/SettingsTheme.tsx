import { useState } from 'react';
import { themeList } from '@/data';
import { getTheme, setTheme } from '@/utils';
import type { Themes } from '@/interfaces/settings.interface';

const SettingsTheme = () => {
	const [selectedTheme, setSelectedTheme] = useState(getTheme());

	const handleThemeChange = (theme: Themes) => {
		localStorage.setItem('THEME', theme);
		setSelectedTheme(theme);
		setTheme();
	};

	return (
		<div className='mt-4 flex gap-2'>
			{themeList.map((theme, index) => (
				<div
					key={index}
					className={`w-full max-w-xs rounded-lg border-2 overflow-hidden border-tertiary ${
						selectedTheme === theme.value ? 'opacity-100 flex-[5]' : 'opacity-50 flex-1'
					} transition-all duration-300`}>
					<label
						htmlFor={theme.value}
						className='cursor-pointer'>
						<div
							className='h-36 p-1'
							style={{ backgroundColor: theme.color }}></div>
					</label>
					<input
						type='radio'
						name='theme'
						id={theme.value}
						className='hidden'
						value={theme.value}
						checked={selectedTheme === theme.value}
						onChange={() => handleThemeChange(theme.value)}
					/>
				</div>
			))}
		</div>
	);
};

export default SettingsTheme;
