import { memo, useState } from 'react';
import './OptionsDisplay.scss';

const OptionsDisplay = ({ open, children }) => {
    const [tab, setTab] = useState('settings');

    return (
        <div className="options-display--wrapper" style={{ maxHeight: open ? '500px' : 0 + 'px' }}>
            <div className="content card__component">
                <nav>
                    <button onClick={() => setTab('settings')}>Settings</button>
                    <button onClick={() => setTab('participants')}>Participants</button>
                    
                </nav>
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
