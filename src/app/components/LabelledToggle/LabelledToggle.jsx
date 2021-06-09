import { memo } from 'react';
import clsx from 'clsx';
import { wrapper, active } from './LabelledToggle.module.sass';

const LabelledToggle = ({ name, labels, isFirst, setIsFirst }) => {
	const onChangeValue = event => {
		setIsFirst(event.target.value === 'true')
	};

	return (
		<div className={wrapper}>
			<input
				type='radio'
				name={name}
				id={name + labels[0].label}
				value={labels[0].value}
				onChange={onChangeValue}
				checked={isFirst}
			/>
			<label
				htmlFor={name + labels[0].label}
				className={clsx(isFirst && active)}
			>
				{labels[0].label}
			</label>
			<input
				type='radio'
				name={name}
				id={name + labels[1].label}
				value={labels[1].value}
				onChange={onChangeValue}
				checked={!isFirst}
			/>
			<label
				htmlFor={name + labels[1].label}
				className={clsx(!isFirst && active)}
			>
				{labels[1].label}
			</label>
		</div>
	);
};

export default memo(LabelledToggle);
