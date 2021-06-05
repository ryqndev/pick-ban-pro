import { memo } from 'react';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../../../../components/ControlledTextInput';
import './DraftSettings.scss';

const DraftSettings = ({ on, setOn, limit, setLimit }) => {
    return (
        <div className="draft-settings--wrapper">
            <div className="time-limits">
                <h3>Timer</h3>
                <label htmlFor="timer">Set Time Limits:</label>
                <Toggle
                    id="timer"
                    icons={false}
                    className="timer-toggle"
                    defaultChecked={on}
                    onChange={() => { setOn(prev => !prev) }}
                />
                {on && (
                    <>
                        <label className="seconds" htmlFor="timer">Seconds per pick:</label>
                        <ControlledTextInput id="time-limit" value={limit} setValue={setLimit} />
                    </>
                )}
            </div>
        </div>
    );
}

export default memo(DraftSettings);
