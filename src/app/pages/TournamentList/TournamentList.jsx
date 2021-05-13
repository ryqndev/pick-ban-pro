import {Fragment} from 'react';
import {Link} from 'react-router-dom';
import RecentTournamentData from '../../assets/RecentTournamentData.json';
import './TournamentList.scss';

const TournamentList = () => {
    return (
        <div>
            {RecentTournamentData.map(tournament => (
                <Fragment key={tournament.name}>
                    <h1>{tournament.name}</h1>
                    {
                        tournament.days.map(day => (
                            <Fragment key={day.date}>
                                <h2>{day.date}</h2>
                                {day.games.map(game => (
                                    <Link to={`/${tournament.name}/${game.blue},${game.red}/${game.draft}`}>{game.blue} vs. {game.red}</Link>
                                ))}
                            </Fragment>
                        ))
                    }
                </Fragment>
            ))}
        </div>
    );
}

export default TournamentList;
