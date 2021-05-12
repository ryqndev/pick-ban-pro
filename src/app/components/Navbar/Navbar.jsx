import {Link} from 'react-router-dom';
import './Navbar.scss';

const splitTeamNames = (teamNames='') => {
    const names = teamNames.split(',');
    if(names.length !== 2) return ['Blue Team', 'Red Team'];
    return names;
}

const Navbar = ({navRenderData}) => {
    const [blueTeamName, redTeamName] = splitTeamNames(navRenderData?.teamNames);
    const blueTimer = '--', redTimer = '--';
    return (
        <nav>
            <Link to="/" className="name">Pick Ban Pro</Link>
            <h2 className="blue">{blueTeamName}</h2>
            <p className="blue">{blueTimer}</p>
            <h1>{navRenderData?.matchName}</h1>
            <p className="red">{redTimer}</p>
            <h2 className="red">{redTeamName}</h2>
        </nav>
    );
}

export default Navbar;
