import { useState, useEffect } from 'react';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../components/ControlledTextInput';
import './Create.scss';

const Create = ({ peer, peerID, listen }) => {
    let { path } = useRouteMatch();
    const history = useHistory();

    const [matchName, setMatchName] = useState('');
    const [blueTeamName, setBlueTeamName] = useState('');
    const [redTeamName, setRedTeamName] = useState('');

    const [hasTimeLimits, setHasTimeLimits] = useState(false);
    const [timeLimit, setTimeLimit] = useState(30);

    const [draftLink, setDraftLink] = useState('/draft');

    const [challengerLink, setChallengerLink] = useState('Creating...');
    const [spectatorLink, setSpectatorLink] = useState('Creating...');

    useEffect(() => {
        listen();
    });

    useEffect(() => {
        if (!peerID?.length) return;
        setChallengerLink(window.location.origin + '/challenger/' + peerID);
        setSpectatorLink(window.location.origin + '/spectator/' + peerID)
    }, [peerID]);

    useEffect(() => {
        if (matchName.length !== 0)
            return setDraftLink(`/d/${encodeURIComponent(matchName)}/${encodeURIComponent(blueTeamName)},${encodeURIComponent(redTeamName)}/`);

        if (redTeamName.length + blueTeamName.length === 0)
            return setDraftLink(`/d/`);

        return setDraftLink(`/draft/${encodeURIComponent(blueTeamName)},${encodeURIComponent(redTeamName)}/`);
    }, [matchName, blueTeamName, redTeamName]);

    const handleSubmit = event => {
        event.preventDefault();
        history.push(draftLink);
    }

    return (
        <div className="create--wrapper">
            <form className="content card__component" onSubmit={handleSubmit}>
                <h1>Options</h1>
                <span>(You can change these during draft)</span>
                <div>

                    <label htmlFor="match-name">Match Name: <span>(optional)</span></label>
                    <ControlledTextInput id="match-name" placeholder="Ex. MSI 2021" value={matchName} setValue={setMatchName} />

                    <label htmlFor="blue-team-name">Blue Team Name: <span>(optional)</span></label>
                    <ControlledTextInput id="blue-team-name" placeholder="Ex. Cloud9" value={blueTeamName} setValue={setBlueTeamName} />


                    <label htmlFor="red-team-name">Red Team Name: <span>(optional)</span></label>
                    <ControlledTextInput id="red-team-name" placeholder="Ex. DWG KIA" value={redTeamName} setValue={setRedTeamName} />

                    <div className="time-limits">
                        <label htmlFor="timer">Set Time Limits:</label>
                        <Toggle
                            id="timer"
                            icons={false}
                            className="timer-toggle"
                            defaultChecked={hasTimeLimits}
                            onChange={() => { setHasTimeLimits(prev => !prev) }}
                        />
                        {
                            hasTimeLimits && (
                                <>
                                    <label className="seconds" htmlFor="timer">Seconds per pick:</label>
                                    <ControlledTextInput id="time-limit" value={timeLimit} setValue={setTimeLimit} />
                                </>
                            )
                        }
                    </div>
                </div>
                <Route exact path={[path, `${path}/test`]}>
                    <button>Start</button>
                </Route>
                <Route path={`${path}/challenge`}>
                    <button>Start</button>
                </Route>
            </form>
            <Route path={`${path}/challenge`}>
                <div className="link-holder card__component">
                    <h1>Challenger & Spectator Links</h1>
                    <label htmlFor="challenger-link">Challenger <span>to play (send only to 1)</span></label>
                    <ControlledTextInput id="challenger-link" value={challengerLink} readOnly />

                    <label htmlFor="spectator-link">Spectator <span>to watch (max. ~200 people)</span></label>
                    <ControlledTextInput id="spectator-link" value={spectatorLink} readOnly />
                </div>
            </Route>
        </div>
    );
}

export default Create;
