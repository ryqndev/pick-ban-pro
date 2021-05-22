import {memo} from 'react';
import './ControlledTextInput.scss';

const ControlledTextInput = ({id, placeholder='', value, setValue}) => {
    const handleTextChange = setValue => event => {
        event.preventDefault();
        setValue(event.target.value);
    }

    return (
        <input
            id={id}
            type="text"
            placeholder={placeholder}
            className="controlled-text-input"
            value={value}
            onChange={handleTextChange(setValue)}
        />
    )
}

export default memo(ControlledTextInput);
