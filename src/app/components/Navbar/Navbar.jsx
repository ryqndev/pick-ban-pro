
import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Navbar.scss';

const splitTeamNames = (teamNames = ',') => {
    const names = teamNames.split(',');
    if (names.length !== 2 || teamNames === ',') return ['Blue Team', 'Red Team'];
    return [decodeURIComponent(names[0]), decodeURIComponent(names[1])];
}

const Navbar = ({ navRenderData }) => {
    useEffect(() => {
        if (!navRenderData?.timeLeft) return;
        document.documentElement.style.setProperty('--navbar-length', navRenderData?.timeLeft / navRenderData?.timeLimit * 100000 + '%');
    }, [navRenderData]);
    useEffect(() => {
        document.documentElement.style.setProperty('--picking-side', navRenderData?.bluePick ? 'var(--accent-primary)' : 'var(--accent-secondary)');
    }, [navRenderData?.bluePick]);

    if (!navRenderData.draft) return (
        <nav>
            <Link to="/" className="name"><Logo /></Link>
            <h1>pickban.pro</h1>
        </nav>
    );

    const [blueTeamName, redTeamName] = splitTeamNames(navRenderData?.teamNames);
    const matchName = decodeURIComponent(navRenderData?.matchName ?? 'pickban.pro');
    const blueTimer = navRenderData?.bluePick ? parseInt(navRenderData?.timeLeft) : '',
        redTimer = !navRenderData?.bluePick ? parseInt(navRenderData?.timeLeft) : '';


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

export default memo(Navbar);
