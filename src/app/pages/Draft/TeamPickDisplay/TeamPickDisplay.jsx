import ChampionIcon from '../../../components/ChampionIcon';
import ChampionPick from './ChampionPick';
import './TeamPickDisplay.scss';

const TeamPickDisplay = ({isLeft}) => {
    return (
        <div className="team-pick-display--wrapper">
            <div className="ban-row">
                <ChampionIcon name={'Zilean'}/>
                <ChampionIcon name={'Galio'}/>
                <ChampionIcon name={'Diana'}/>
            </div>
            <ChampionPick isLeft={isLeft} />
            <ChampionPick isLeft={isLeft} />
            <ChampionPick isLeft={isLeft} />
            <div className="ban-row">
                <ChampionIcon />
                <ChampionIcon />
            </div>
            <ChampionPick isLeft={isLeft} />
            <ChampionPick isLeft={isLeft} />
        </div>
    )
}

export default TeamPickDisplay;
