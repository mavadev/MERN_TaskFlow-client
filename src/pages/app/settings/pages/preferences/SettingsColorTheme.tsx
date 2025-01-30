import { useState } from 'react';
import ColorPicker from './ColorPicker';

const colorsTheme = [
	{ name: 'Azul', value: '#2F72FF' },
	{ name: 'Rojo', value: '#FF495F' },
	{ name: 'Verde', value: '#064E3B' },
	{ name: 'Amarillo', value: '#FFCF40' },
	{ name: 'Morado', value: '#8C70FF' },
	{ name: 'Naranja', value: '#FF9C2A' },
	{ name: 'Gris', value: '#000' },
];

const loadSelectedColor = () => {
	const selectedColor = localStorage.getItem('COLOR_THEME');
	if (selectedColor) return selectedColor;
	return colorsTheme[0].value;
};

const loadColorPicker = () => {
	const colorPicker = localStorage.getItem('COLOR_PICKER');
	return colorPicker;
};

const SettingsColorTheme = () => {
	const [selectedColor, setSelectedColor] = useState(loadSelectedColor());

	// Seleccionar color
	const handleSelectColor = (color: string) => {
		setSelectedColor(color);
		localStorage.setItem('COLOR_THEME', color);
	};

	return (
		<div className='mt-5 flex gap-3 flex-wrap'>
			{colorsTheme.map(color => (
				<button
					key={color.name}
					onClick={() => handleSelectColor(color.value)}
					className='w-12 h-12 rounded-full p-1 border-4'
					style={{ borderColor: selectedColor === color.value ? color.value : '#ebebeb' }}>
					<div
						className='w-full h-full rounded-full'
						style={{ backgroundColor: color.value }}
					/>
				</button>
			))}
			<ColorPicker
				selectedColor={selectedColor}
				colorDefault={loadColorPicker()}
				setSelectedColor={handleSelectColor}
			/>
		</div>
	);
};

export default SettingsColorTheme;
