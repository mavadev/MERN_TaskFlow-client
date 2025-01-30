import { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ColorPickerProps {
	colorDefault: string | null;
	selectedColor: string;
	setSelectedColor: (color: string) => void;
}

const ColorPicker = ({ colorDefault, selectedColor, setSelectedColor }: ColorPickerProps) => {
	const [enableNewColor, setEnableNewColor] = useState(!!colorDefault);

	const [isOpen, setIsOpen] = useState(false);
	const [color, setColor] = useState(colorDefault || '#000');
	const [lastColor, setLastColor] = useState(colorDefault || '#000');

	// Guardar color seleccionado
	const saveColorStorage = (color: string) => {
		localStorage.setItem('COLOR_PICKER', color);
	};

	// Mostrar o ocultar el color picker
	const handleViewPicker = () => {
		setIsOpen(!isOpen);
	};

	// Cambiar el color del color picker
	const handleColorPicker = (colorPicked: string) => {
		setColor(colorPicked);
	};

	// Guardar el color seleccionado
	const handleSaveColor = () => {
		if (lastColor !== color) {
			setLastColor(color);
			saveColorStorage(color);
			setSelectedColor(color);
			!enableNewColor && setEnableNewColor(true);
		}
	};

	const pickerIsSelected = useMemo(() => {
		return enableNewColor && selectedColor === lastColor;
	}, [enableNewColor, selectedColor, lastColor]);

	return (
		<div className='relative'>
			<button
				onClick={handleViewPicker}
				className='w-12 h-12 rounded-full p-1 border-4 border-dashed'
				style={{ borderColor: pickerIsSelected ? color : '#ebebeb' }}>
				<div
					className='w-full h-full rounded-full grid place-items-center'
					style={{ backgroundColor: enableNewColor ? color : '#ebebeb' }}>
					{!enableNewColor ? <PlusIcon className='w-4 h-4 text-black	' /> : null}
				</div>
			</button>
			<HexColorPicker
				color={color}
				onMouseUp={handleSaveColor}
				onChange={handleColorPicker}
				style={{ position: 'absolute' }}
				className={`${isOpen ? 'visible' : 'invisible'} top-0 left-16`}
			/>
		</div>
	);
};

export default ColorPicker;
