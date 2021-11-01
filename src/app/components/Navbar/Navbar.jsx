import clsx from 'clsx';
import { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import cn from './Navbar.module.scss';


const Navbar = ({ type, time, limit, end, side, names }) => {
    useEffect(() => {
        if (!time || !end) return document.documentElement.style.setProperty('--navbar-length', '0%');
        document.documentElement.style.setProperty('--navbar-length', time / limit * 100 + '%');
    }, [time, limit, end]);

    useEffect(() => {
        document.documentElement.style.setProperty('--picking-side', `var(--accent-${side === 'red' ? 'secondary' : 'primary'})`);
    }, [side]);

    if (!type) return (
        <nav className={cn.container}>
            <Link to="/" className={cn.name}><Logo /></Link>
            <h1>pickban.pro</h1>
        </nav>
    );

    const isRed = side === 'red';
    const isBlue = side === 'blue';

    const blueTimer = end !== 0 && isBlue ? ~~(time ?? 30) : '',
        redTimer = end !== 0 && isRed ? ~~(time ?? 30) : '';

    return (
        <nav className={clsx(cn.container, cn['with-bar'])}>
            <Link to="/" className={cn.name}><Logo /></Link>
            <h2 className={clsx(cn.blue, isBlue && cn.active)}>{names.blue}</h2>
            <p className={cn.blue}>{blueTimer}</p>
            <h1>{names.match}</h1>
            <p className={cn.red}>{redTimer}</p>
            <h2 className={clsx(cn.red, isRed && cn.active)}>{names.red}</h2>
        </nav>
    );
}

export default memo(Navbar);
