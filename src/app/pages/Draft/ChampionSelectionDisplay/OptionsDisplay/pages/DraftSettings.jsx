import { memo } from 'react';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../../../../components/ControlledTextInput';
import clsx from 'clsx';
import './DraftSettings.scss';

const DraftSettings = ({
	className,
	hasTimeLimits,
    timeLimit,
	toggleTimeLimits = () => {},
	setTimeLimit = () => {},
}) => {
	return (
		<div className={clsx('draft-settings--wrapper', className)}>
			<div className='time-limits'>
				<h3>Timer</h3>
				<label htmlFor='timer'>Set Time Limits:</label>
				<Toggle
					id='timer'
					icons={false}
					className='timer-toggle'
					checked={hasTimeLimits}
					onChange={() => toggleTimeLimits(prev => !prev)}
				/>
				{hasTimeLimits && (
					<>
						<label className='seconds' htmlFor='timer'>
							Seconds per pick:
						</label>
						<ControlledTextInput
							id='time-limit'
							value={timeLimit}
							setValue={setTimeLimit}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default memo(DraftSettings);
