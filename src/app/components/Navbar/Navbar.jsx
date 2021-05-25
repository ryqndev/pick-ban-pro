
import { useEffect, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Navbar.scss';

const splitTeamNames = (teamNames = ',') => {
    const names = teamNames.split(',');
    if (names.length !== 2 || teamNames === ',') return ['Blue Team', 'Red Team'];
    return [decodeURIComponent(names[0]), decodeURIComponent(names[1])];
}

const Navbar = ({ navRenderData }) => {
    const { matchName, teamNames } = useParams();

    useEffect(() => {
        if (!navRenderData?.timeLeft) return;
        document.documentElement.style.setProperty('--navbar-length', navRenderData?.timeLeft / navRenderData?.timeLimit * 100000 + '%');
    }, [navRenderData?.timeLeft, navRenderData?.timeLimit]);

    useEffect(() => {
        document.documentElement.style.setProperty('--picking-side', navRenderData?.side ? 'var(--accent-primary)' : 'var(--accent-secondary)');
    }, [navRenderData?.side]);

    if (!navRenderData?.type) return (
        <nav>
            <Link to="/" className="name"><Logo /></Link>
            <h1>pickban.pro</h1>
        </nav>
    );

    const side = navRenderData?.side;
    const isRed = side === 'red';
    const isBlue = side === 'blue';

    const [blueTeamName, redTeamName] = splitTeamNames(teamNames);
    let names = {
        match: navRenderData?.match ?? decodeURIComponent(matchName ?? 'pickban.pro'),
        red: navRenderData?.red ?? redTeamName,
        blue: navRenderData?.blue ?? blueTeamName,
    }


    const blueTimer = isBlue ? parseInt(navRenderData?.timeLeft) : '',
        redTimer = isRed ? parseInt(navRenderData?.timeLeft) : '';

    return (
        <nav className="with-bar">
            <Link to="/" className="name"><Logo /></Link>
            <h2 className="blue" style={{ color: isBlue ? 'white' : 'var(--bg-primary-light)' }}>{names.blue}</h2>
            <p className="blue">{blueTimer}</p>
            <h1>{names.match}</h1>
            <p className="red">{redTimer}</p>
            <h2 className="red" style={{ color: isRed ? 'white' : 'var(--bg-primary-light)' }}>{names.red}</h2>
        </nav>
    );
}

export default memo(Navbar);
