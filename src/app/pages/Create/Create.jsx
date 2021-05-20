import { useState, useEffect } from 'react';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import ControlledTextInput from '../../components/ControlledTextInput';
import './Create.scss';

const Create = () => {
    let { path } = useRouteMatch();
    const history = useHistory();

    const [matchName, setMatchName] = useState('');
    const [blueTeamName, setBlueTeamName] = useState('');
    const [redTeamName, setRedTeamName] = useState('');

    const [hasTimeLimits, setHasTimeLimits] = useState(false);
    const [timeLimit, setTimeLimit] = useState(30);

    const [draftLink, setDraftLink] = useState('/draft');

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

                <label htmlFor="match-name">Match Name: <span>(optional)</span></label>
                <ControlledTextInput id="match-name" placeholder="Ex. MSI 2021" value={matchName} setValue={setMatchName}/>

                <label htmlFor="blue-team-name">Blue Team Name: <span>(optional)</span></label>
                <ControlledTextInput id="blue-team-name" placeholder="Ex. Cloud9" value={blueTeamName} setValue={setBlueTeamName}/>


                <label htmlFor="red-team-name">Red Team Name: <span>(optional)</span></label>
                <ControlledTextInput id="red-team-name" placeholder="Ex. DWG KIA" value={redTeamName} setValue={setRedTeamName}/>

                <div className="time-limits">
                    <label htmlFor="timer">Set Time Limits</label>
                    <input type="checkbox" id="timer" name="scales" checked={hasTimeLimits} onChange={() => {setHasTimeLimits(prev => !prev)}}/>
                </div>

                <Route exact path={[path, `${path}/test`]}>
                    <button>Start</button>
                </Route>
                <Route path={`${path}/challenge`}>
                    <button></button>
                </Route>
            </form>
        </div>
    );
}

export default Create;
