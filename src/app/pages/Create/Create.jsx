import { useState, useEffect } from 'react';
import { useRouteMatch, Route, Link } from 'react-router-dom';
import './Create.scss';

const Create = () => {
    let { path } = useRouteMatch();
    const [matchName, setMatchName] = useState('');
    const [blueTeamName, setBlueTeamName] = useState('');
    const [redTeamName, setRedTeamName] = useState('');
    const [draftLink, setDraftLink] = useState('/draft');

    const handleTextChange = setValue => event => {
        event.preventDefault();
        setValue(event.target.value);
    }

    useEffect(() => {
        if (matchName.length !== 0)
            return setDraftLink(`/d/${encodeURIComponent(matchName)}/${encodeURIComponent(blueTeamName)},${encodeURIComponent(redTeamName)}/`);

        if (redTeamName.length + blueTeamName.length === 0)
            return setDraftLink(`/d/`);

        return setDraftLink(`/draft/${encodeURIComponent(blueTeamName)},${encodeURIComponent(redTeamName)}/`);
    }, [matchName, blueTeamName, redTeamName]);


    return (
        <div className="create--wrapper">
            <form className="content card__component">
                <h1>Options</h1>

                <label htmlFor="match-name">Match Name:  <span>(optional)</span></label>
                <input
                    id="match-name"
                    type="text"
                    placeholder="Ex. MSI 2021"
                    value={matchName}
                    onChange={handleTextChange(setMatchName)}
                />

                <label htmlFor="blue-team-name">Blue Team Name:  <span>(optional)</span></label>
                <input
                    id="blue-team-name"
                    type="text"
                    placeholder="Ex. Cloud 9"
                    value={blueTeamName}
                    onChange={handleTextChange(setBlueTeamName)}
                />

                <label htmlFor="red-team-name">Red Team Name:  <span>(optional)</span></label>
                <input
                    id="red-team-name"
                    type="text"
                    placeholder="Ex. DWG KIA"
                    value={redTeamName}
                    onChange={handleTextChange(setRedTeamName)}
                />

                <Route exact path={[path, `${path}/test`]}>
                    <Link to={draftLink}>Start</Link>
                </Route>
                <Route path={`${path}/challenge`}>
                    <button></button>
                </Route>
            </form>
        </div>
    );
}

export default Create;
