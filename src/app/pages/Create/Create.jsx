import { useRouteMatch, Route } from 'react-router-dom';
import './Create.scss';

const Create = () => {
    let {path} = useRouteMatch();

    return (
        <div className="create--wrapper">
            <form className="content card__component">
                <h1>Options</h1>

                <label htmlFor="match-name">Match Name:  <span>(optional)</span></label>
                <input id="match-name" type="text" placeholder="Ex. MSI 2020"/>

                <label htmlFor="blue-team-name">Blue Team Name:  <span>(optional)</span></label>
                <input id="blue-team-name" type="text" placeholder="Ex. Cloud9"/>

                <label htmlFor="red-team-name">Red Team Name:  <span>(optional)</span></label>
                <input id="red-team-name" type="text" placeholder="Ex. DWG KIA"/>

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
