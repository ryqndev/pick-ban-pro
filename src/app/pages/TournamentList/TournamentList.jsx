import { Link } from 'react-router-dom';
import RecentTournamentData from '../../assets/RecentTournamentData.json';
import './TournamentList.scss';

const TournamentList = () => {
    return (
        <div className="tournament-list--page">
            {RecentTournamentData.map(({ stages, name }) => (
                <div className="tournament" key={name}>
                    <h1>{name}</h1>
                    {stages.map((stage, i) => <StageList key={i} tournament={name} {...stage} />)}
                </div>
            ))}
        </div>
    );
}

const StageList = ({ tournament, name, days }) => {
    return (
        <div className="stage">
            <h2>{name}</h2>
            <div className="scroller">
                <div className="scroll-content--holder">
                    {days.map((day, i) => <DayList key={i} tournament={tournament} {...day} />)}
                </div>
            </div>
        </div>
    );
}
const DayList = ({ tournament, date, games }) => {
    return (
        <div className="day card__component" key={date}>
            <h3>{date}</h3>
            {games.map(({ blue, red, draft }, i) => (
                <div key={i} className="match">
                    <Link to={`/d/${tournament}/${blue},${red}/${draft}`}>
                        {blue} vs. {red}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default TournamentList;
