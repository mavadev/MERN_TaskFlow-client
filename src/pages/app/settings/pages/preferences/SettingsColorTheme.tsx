import { useState } from 'react';
import { colorThemeList } from '@/data';
import { getColorTheme, setTheme } from '@/utils';
import type { ColorThemes } from '@/interfaces/settings.interface';

const SettingsColorTheme = () => {
	const [selectedColor, setSelectedColor] = useState(getColorTheme());

	// Seleccionar color
	const handleSelectColor = (color: ColorThemes) => {
		localStorage.setItem('COLOR_THEME', color);
		setSelectedColor(color);
		setTheme();
	};

	return (
		<div className='mt-5 flex gap-3 flex-wrap'>
			{colorThemeList.map(color => (
				<button
					key={color.name}
					onClick={() => handleSelectColor(color.value)}
					className='w-12 h-12 rounded-full p-1 border-4'
					style={{ borderColor: selectedColor === color.value ? color.color : '#ebebeb' }}>
					<div
						className='w-full h-full rounded-full'
						style={{ backgroundColor: color.color }}
					/>
				</button>
			))}
		</div>
	);
};

export default SettingsColorTheme;
