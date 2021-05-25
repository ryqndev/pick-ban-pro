import {useContext, memo} from 'react';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
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
const TeamPickDisplay = ({isLeft, currentPick, teamPickData}) => {
    const championContextData = useContext(ChampionsContext);

    const getChampionData = (championID) => {
        if(!championID || championID === 'none' || !championContextData.championsList) return {id: championID};
        return {name: championContextData.championsList[championID].name, id: championID}
    }

    const isCurrentPick = (index) => (isLeft === currentPick.blue) && (currentPick.index === index);

    return (
        <div className={`team-pick-display--wrapper`}>
            <div className="ban-row phase-1">
                {teamPickData.slice(BAN_1_START, BAN_1_END + 1).map((champion, index) => (
                    <ChampionBan key={index} {...getChampionData(champion)} currentPick={isCurrentPick(index)}/>
                ))}
            </div>
            {teamPickData.slice(PICK_1_START, PICK_1_END + 1).map((champion, index) => (
                <ChampionPick
                    key={index}
                    className={`pick ${isCurrentPick(index + PICK_1_START) ? 'currently-picking' : ''}`}
                    isLeft={isLeft}
                    {...getChampionData(champion)} 
                />
            ))}
            <div className="ban-row phase-2">
            {teamPickData.slice(BAN_2_START, BAN_2_END + 1).map((champion, index) => (
                <ChampionBan key={index} {...getChampionData(champion)} currentPick={isCurrentPick(index + BAN_2_START)}/>
            ))}
            </div>
            {teamPickData.slice(PICK_2_START, PICK_2_END + 1).map((champion, index) => (
                <ChampionPick
                    key={index}
                    className={`pick ${isCurrentPick(index + PICK_2_START) ? 'currently-picking' : ''}`}
                    isLeft={isLeft}
                    {...getChampionData(champion)} 
                />
            ))}
        </div>
    );
}

export default memo(TeamPickDisplay);