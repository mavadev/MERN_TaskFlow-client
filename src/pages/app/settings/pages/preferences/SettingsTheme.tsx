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
		<div className='mt-4 flex gap-5'>
			{themeList.map((theme, index) => (
				<div
					key={index}
					style={{ borderColor: selectedTheme === theme.value ? '' : 'gray' }}
					className='w-full max-w-xs rounded-lg border-2 border-primary-800 overflow-hidden'>
					<label
						htmlFor={theme.value}
						className='cursor-pointer'>
						<div
							className='aspect-square md:aspect-video p-1 rounded-t-md'
							style={{ backgroundColor: theme.color }}></div>
					</label>
					<div className='flex items-center gap-2 border-t-2 border-gray-400'>
						<input
							type='radio'
							name='theme'
							className='w-4 h-4 appearance-none border-2 border-gray-300 rounded-full checked:bg-primary-500 checked:border-primary-500 ml-3'
							id={theme.value}
							value={theme.value}
							checked={selectedTheme === theme.value}
							onChange={() => handleThemeChange(theme.value)}
						/>
						<label
							className='text-sm w-full p-3 cursor-pointer'
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
