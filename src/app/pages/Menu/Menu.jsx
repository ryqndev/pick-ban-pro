import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = ({ setNav }) => {
	useEffect(() => { setNav({}) }, [setNav]);

	return (
		<div className='menu--wrapper'>
			<div className='selection--holder'>
				<h1>formats</h1>
				<Link to='/create' className='card__component test'>
					<div className='selection test'>
						<h2>Practice.</h2>
						<span>(Single-player + spectators)</span>
						<p>
							Play around with a tournament draft pro teams use
							with / without time limits and invite spectators to
							watch your drafts.
						</p>
					</div>
				</Link>
				<Link to='/challenge' className='card__component draft'>
					<div className='selection draft'>
						<h2>Draft.</h2>
						<span>(2 players + spectators)</span>
						<p>
							[BETA] Participate in a mock draft with another
							coach with a generated link with custom settings.
							Spectator links will also be available.
						</p>
					</div>
				</Link>
				<Link to='/tournaments' className='card__component explore'>
					<div className='selection explore'>
						<h2>Explore.</h2>
						<span>(Most major regions supported)</span>
						<p>
							Examine and analyze completed drafts at the highest
							level of league competition from all regions. In the
							process of adding more.
						</p>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Menu;
