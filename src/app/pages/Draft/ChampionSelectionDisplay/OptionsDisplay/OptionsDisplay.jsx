import { memo, useState } from 'react';
import './OptionsDisplay.scss';
import {DraftSettings, ParticipantsSettings} from './pages';

const OptionsDisplay = ({ open, children }) => {
    const [tab, setTab] = useState('settings');

    return (
        <div className="options-display--wrapper" style={{ maxHeight: open ? '500px' : 0 + 'px' }}>
            <div className="content card__component">
                <nav className="options-tabs">
                    <button className={tab === 'settings' && "selected"} onClick={() => setTab('settings')}>Settings</button>
                    <button className={tab === 'participants' && "selected"} onClick={() => setTab('participants')}>Participants</button>

                </nav>
                { tab === 'settings' && (
                    <DraftSettings />
                )}
                { tab === 'participants' && (
                    <ParticipantsSettings {...children}/>
                )}
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
