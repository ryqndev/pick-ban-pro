import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../components/ControlledTextInput';
import './Create.scss';

const Create = ({ peerID }) => {
    const navigate = useNavigate();

    const [matchName, setMatchName] = useState('');
    const [blueTeamName, setBlueTeamName] = useState('');
    const [redTeamName, setRedTeamName] = useState('');

    const [hasTimeLimits, setHasTimeLimits] = useState(false);
    const [timeLimit, setTimeLimit] = useState(30);

    const [draftLink, setDraftLink] = useState('/d');

    const [challengerLink, setChallengerLink] = useState('Creating...');
    const [spectatorLink, setSpectatorLink] = useState('Creating...');

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
        navigate(draftLink, { 
            state: {
                names: {
                    match: matchName,
                    blue: blueTeamName,
                    red: redTeamName,
                },
                hasTimeLimits,
                timeLimit,
                challengerLink,
                spectatorLink,
            }
        });
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
                <button>Start</button>
            </form>
            <div className="link-holder card__component">
                <Routes>
                    <Route path="/" element={
                        <>
                            <h1>Spectator Link</h1>
                            <span>Let people watch you as you draft</span>
                        </>
                    } />
                    <Route path="/challenge" element={
                        <>
                            <h1>Challenger & Spectator Links</h1>
                            <label htmlFor="challenger-link">Challenger <span>to play (send only to 1)</span></label>
                            <ControlledTextInput id="challenger-link" value={challengerLink} readOnly />
                        </>
                    } />
                </Routes>

                <label htmlFor="spectator-link">Spectator <span>to watch (max. ~200 people)</span></label>
                <ControlledTextInput id="spectator-link" value={spectatorLink} readOnly />
            </div>
        </div>
    );
}

export default Create;
