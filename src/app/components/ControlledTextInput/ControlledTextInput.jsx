import { memo } from 'react';
import { component } from './ControlledTextInput.module.sass';

const ControlledTextInput = ({ id, placeholder = '', disabled=false, value, setValue }) => {
	const handleTextChange = setValue => event => {
		event.preventDefault();
		setValue(event.target.value);
	};

	return (
		<input
			disabled={disabled}
			id={id}
			type='text'
			placeholder={placeholder}
			className={component}
			value={value}
			onChange={handleTextChange(setValue)}
		/>
	);
};

export default memo(ControlledTextInput);
