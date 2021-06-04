import { memo, useState } from 'react';
import clsx from 'clsx';
import { Links } from '../../../../components/PeerDisplays';
import { DraftSettings } from './pages';
import './OptionsDisplay.scss';

const OptionsDisplay = ({ open, children }) => {
    const [tab, setTab] = useState('settings');

    return (
        <div className="options-display--wrapper" style={{ maxHeight: open ? '500px' : '0px' }}>
            <div className="content card__component">
                <nav className="options-tabs">
                    <button className={clsx(tab === 'settings' && "selected")} onClick={() => setTab('settings')}>Settings</button>
                    <button className={clsx(tab === 'participants' && "selected")} onClick={() => setTab('participants')}>Participants</button>

                </nav>
                <div className="open-page" style={{borderRadius: tab === 'settings' ? '0px 4px 4px 4px' : '4px'}}>
                    <div style={{maxWidth: '450px', margin: '0 auto'}}>
                        {tab === 'settings' && (
                            <DraftSettings {...children} />
                        )}
                        {tab === 'participants' && (
                            <Links {...children} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
