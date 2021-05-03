import {Link} from 'react-router-dom';
import './Navbar.scss';


const Navbar = () => {
    return (
        <nav>
            <Link to="/" className="name">Pick Ban Pro</Link>
        </nav>
    );
}

export default Navbar;
