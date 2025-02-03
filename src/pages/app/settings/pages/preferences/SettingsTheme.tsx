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
					className='w-full max-w-xs rounded-lg border-2 overflow-hidden border-tertiary'
					style={{ opacity: selectedTheme === theme.value ? 1 : 0.75 }}>
					<label
						htmlFor={theme.value}
						className='cursor-pointer'>
						<div
							className='aspect-square md:aspect-video p-1'
							style={{ backgroundColor: theme.color }}></div>
					</label>
					<div className='flex items-center gap-2 border-t-2 border-tertiary'>
						<input
							type='radio'
							name='theme'
							id={theme.value}
							value={theme.value}
							checked={selectedTheme === theme.value}
							onChange={() => handleThemeChange(theme.value)}
							className='size-5 appearance-none border-2 border-tertiary rounded-full checked:bg-tertiary ml-3'
						/>
						<label
							className='text-sm flex-1 p-3 cursor-pointer'
							htmlFor={theme.value}>
							{theme.name}
						</label>
					</div>
				</div>
			))}
		</div>
	);
};

export default SettingsTheme;
