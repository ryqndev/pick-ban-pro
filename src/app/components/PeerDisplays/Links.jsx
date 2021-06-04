import {memo, useState, useEffect} from 'react';
import ControlledTextInput from '../ControlledTextInput';
import './Links.scss';

const Links = ({challenger, spectators, peerID, style={} }) => {
    const [challengerLink, setChallengerLink] = useState('Creating...');
    const [spectatorLink, setSpectatorLink] = useState('Creating...');

    useEffect(() => {
        if (!peerID?.length) return;
        setChallengerLink(window.location.origin + '/challenger/' + peerID);
        setSpectatorLink(window.location.origin + '/spectator/' + peerID)
    }, [peerID]);

    return (
        <div className="links--component-wrapper" style={style}>
            <h1>{challenger ? 'Challenger & ' : ''}Spectator Link{challenger ? 's' : ''}</h1>
            <span>{!challenger ? 'Let people watch you as you draft' : 'Play against a friend and invite people to watch'}</span>

            {challenger && (<>
                <label htmlFor="challenger-link">Challenger <span>to play (send only to 1)</span></label>
                <ControlledTextInput id="challenger-link" value={challengerLink} readOnly />

                <span style={{color: 'white'}}>{'challenger is connected'}</span>
            </>)}

            <label htmlFor="spectator-link">Spectator <span>to watch (max. ~200 people)</span></label>
            <ControlledTextInput id="spectator-link" value={spectatorLink} readOnly />
            
            <span style={{color: 'white'}}>{spectators?.length ?? 0} spectators currently connected</span>
        </div>
    );
}

export default memo(Links);
