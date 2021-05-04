import ChampionBan from './ChampionBan';
import ChampionPick from './ChampionPick';
import './TeamPickDisplay.scss';

const BAN_1_START = 0;
const BAN_1_END = 2;
const PICK_1_START = 3;
const PICK_1_END = 5;
const BAN_2_START = 6;
const BAN_2_END = 7;
const PICK_2_START = 8;
const PICK_2_END = 10;

/**
 * @note Using the loop index as a key for all component loops because the number of items in the array should 
 * never change... unless the game itself changes
 */
const TeamPickDisplay = ({isLeft, draft}) => {
    return (
        <div className={`team-pick-display--wrapper currently-picking`}>
            <div className="ban-row">
                {draft.slice(BAN_1_START, BAN_1_END + 1).map(({status, val, id}, index) => (
                    <ChampionBan key={index} name={status !== -1 ? val : ''} id={id}/>
                ))}
            </div>
            {draft.slice(PICK_1_START, PICK_1_END + 1).map(({status, val, id}) => (
                <ChampionPick
                    className={`pick ${status === 0 ? 'currently-picking' : ''}`}
                    isLeft={isLeft}
                    name={status !== -1 ? val : ''} 
                    id={id}
                />
            ))}
            <div className="ban-row">
            {draft.slice(BAN_2_START, BAN_2_END + 1).map(({status, val, id}, index) => (
                <ChampionBan key={index} name={status !== -1 ? val : ''} id={id}/>
            ))}
            </div>
            {draft.slice(PICK_2_START, PICK_2_END + 1).map(({status, val, id}) => (
                <ChampionPick
                    className={`pick ${status === 0 ? 'currently-picking' : ''}`}
                    isLeft={isLeft}
                    name={status !== -1 ? val : ''} 
                    id={id}
                />
            ))}
        </div>
    )
}

export default TeamPickDisplay;
