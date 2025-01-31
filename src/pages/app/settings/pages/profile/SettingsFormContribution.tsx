const SettingsFormContribution = () => {
	return (
		<form className='space-y-5'>
			<div className='space-y-5'>
				<div>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='collaborate'
							className='size-4'
						/>
						<label htmlFor='collaborate'>Permitir ser contribuidor de proyectos</label>
					</div>
					<p className='text-sm text-gray-500 mt-1'>Permite que otros usuarios te agreguen a sus proyectos.</p>
				</div>
				<div>
					<div className='flex items-center gap-2'>
						<input
							type='checkbox'
							id='collaborators'
							className='size-4'
						/>
						<label htmlFor='collaborators'>Permitir contribuidores en proyectos</label>
					</div>
					<p className='text-sm text-gray-500 mt-1'>Permite que otros usuarios puedan contribuir a tus proyectos.</p>
				</div>
			</div>
			<button
				type='submit'
				className='btn btn-primary w-full md:w-max'>
				Actualizar contribución
			</button>
		</form>
	);
};

export default SettingsFormContribution;
