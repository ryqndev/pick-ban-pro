import {memo, useState, useEffect} from 'react';
import ControlledTextInput from '../ControlledTextInput';
import './Links.scss';

const Links = ({challenge, connection, spectators, peerID }) => {
    const [challengerLink, setChallengerLink] = useState('Creating...');
    const [spectatorLink, setSpectatorLink] = useState('Creating...');

    useEffect(() => {
        if (!peerID?.length) return;
        setChallengerLink(window.location.origin + '/challenger/' + peerID);
        setSpectatorLink(window.location.origin + '/spectator/' + peerID)
    }, [peerID]);

    return (
        <div className="links--component-wrapper">
            <h1>{challenge ? 'Challenger & ' : ''}Spectator Link{challenge ? 's' : ''}</h1>
            <span>{!challenge ? 'Let people watch you as you draft' : 'Play against a friend and invite people to watch'}</span>

            {challenge && (<>
                <label htmlFor="challenger-link">Challenger <span>to play (send only to 1)</span></label>
                <ControlledTextInput id="challenger-link" value={challengerLink} readOnly />

                <span style={{color: connection ? 'green' : 'red'}}>{connection ? 'Challenger is connected' : 'Challenger not connected'}</span>
            </>)}

            <label htmlFor="spectator-link">Spectator <span>to watch (max. ~200 people)</span></label>
            <ControlledTextInput id="spectator-link" value={spectatorLink} readOnly />
            
            <span style={{color: 'white'}}>{spectators?.length ?? 0} spectators currently connected</span>
        </div>
    );
}

export default memo(Links);
