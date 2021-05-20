import { Link } from 'react-router-dom';
import './Landing.scss';

const Landing = () => {
    return (
        <div className="landing-page--wrapper">
            <header>
                <div className="splash-decoration">
                    <div>
                        <h1>pick ban pro</h1>
                    </div>
                </div>
                <Link to="/menu" className="start">START</Link>
            </header>
        </div>
    );
}

export default Landing;
