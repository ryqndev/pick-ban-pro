
import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import './Navbar.scss';

const Navbar = ({ timeLeft, timeLimit, timerEnd, side, type, names }) => {
    useEffect(() => {
        if (!timeLeft) return;
        document.documentElement.style.setProperty(
            '--navbar-length', timeLeft / timeLimit * 100 + '%');
    }, [timeLeft, timeLimit]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--picking-side', `var(--accent-${side === 'red' ? 'secondary' : 'primary'})`);
    }, [side]);

    if (!type) return (
        <nav>
            <Link to="/" className="name"><Logo /></Link>
            <h1>pickban.pro</h1>
        </nav>
    );

    const isRed = side === 'red';
    const isBlue = side === 'blue';

    const blueTimer = timerEnd !== 0 && isBlue ? ~~(timeLeft ?? 30) : '',
        redTimer = timerEnd !== 0 && isRed ? ~~(timeLeft ?? 30) : '';

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
