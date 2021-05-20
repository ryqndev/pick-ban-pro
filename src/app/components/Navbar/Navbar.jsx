import {Link} from 'react-router-dom';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import './Navbar.scss';

const splitTeamNames = (teamNames='') => {
    const names = teamNames.split(',');
    if(names.length !== 2) return ['Blue Team', 'Red Team'];
    return names;
}

const Navbar = ({navRenderData}) => {
    if(!navRenderData.draft) return (
        <nav>
            <Link to="/" className="name"><Logo /></Link>
        </nav>
    );
    
    const [blueTeamName, redTeamName] = splitTeamNames(navRenderData?.teamNames);
    const matchName = navRenderData?.matchName;
    const blueTimer = '', redTimer = '';

    return (
        <nav className="with-bar">
            <Link to="/" className="name"><Logo /></Link>
            <h2 className="blue">{blueTeamName}</h2>
            <p className="blue">{blueTimer}</p>
            <h1>{matchName}</h1>
            <p className="red">{redTimer}</p>
            <h2 className="red">{redTeamName}</h2>
        </nav>
    );
}

export default Navbar;
