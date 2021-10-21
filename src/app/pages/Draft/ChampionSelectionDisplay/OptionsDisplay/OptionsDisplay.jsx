import { memo, useState } from 'react';
import clsx from 'clsx';
import { Links } from '../../../../components/PeerDisplays';
import { DraftSettings } from './pages';
import { useParams } from 'react-router-dom';
import cn from './OptionsDisplay.module.scss';

const OptionsDisplay = ({ open, ...settings }) => {
    const [tab, setTab] = useState('settings');
    const {id} = useParams();

    return (
        <div className={cn.container} style={{ maxHeight: open ? '95vh' : '0px' }}>

            <div className={clsx(cn.content, 'card__component')}>
                <nav className={cn['options-tabs']}>
                    <button className={clsx(tab === 'settings' && cn.selected)} onClick={() => setTab('settings')}>Settings</button>
                    <button className={clsx(tab === 'participants' && cn.selected)} onClick={() => setTab('participants')}>Participants</button>
                    <button className={clsx(tab === 'counters' && cn.selected)} onClick={() => setTab('counters')}>Counters</button>
                    <button onClick={() => settings.setOpen(false)}> x </button>
                </nav>
                <div className={cn['open-page']} style={{borderRadius: tab === 'settings' ? '0px 4px 4px 4px' : '4px'}}>
                    <div style={{margin: '0 auto'}}>
                        {tab === 'settings' && (
                            <DraftSettings className={cn['max-width']} {...settings} />
                        )}
                        {tab === 'participants' && (
                            <Links className={cn['max-width']} {...settings} roomid={id} />
                        )}
                        {tab === 'counters' && (
                            <iframe id={cn.counters}
                                title="Quinn Counters"
                                width="100%"
                                // TODO: for testing purposes only. contact for permission to iframe
                                src="https://app.mobalytics.gg/lol/champions/quinn/counters"
                                // src="https://na.op.gg/champion/quinn/statistics/top/matchup"
                            >
                            </iframe>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
