import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () => {
    return (
        <div className="menu--wrapper">
            <div className="selection--holder">
                <Link to="/create" className="card__component test">
                    <div className="selection test">
                        <h2>Test.</h2>
                        <span>(Single-player)</span>
                        <p>Play around with a tournament draft pro teams use without time limits with in-depth analysis.</p>
                    </div>
                </Link>
                <Link to="/create/challenge" className="card__component draft">
                    <div className="selection draft">
                        <h2>Draft.</h2>
                        <span>(2 players + spectators)</span>
                        <p>Participate in a mock draft with another coach with a generated link with custom settings. Spectator links will also be available.</p>
                    </div>
                </Link>
                <Link to="/list" className="card__component explore">
                    <div className="selection explore">
                        <h2>Explore.</h2>
                        <span>(MSI 2020)</span>
                        <p>Examine and analyze completed drafts at the highest level of league competition.</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Menu;
