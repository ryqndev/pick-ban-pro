import {useContext} from 'react';
import {PICKS} from '../../../controller/draftLogicControllerUtil.js';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionSelect from '../../../components/ChampionSelect';
import NoneIcon from '../../../assets/square.png';
import './ChampionSelectionDisplay.scss';
import useEventListener from '../../../controller/hooks/useEventListener.js';


const ChampionSelectionDisplay = ({lockin, undo, select, draft, currentPick}) => {
    const disabled = new Set(draft);
    const { championsList } = useContext(ChampionsContext);

    const selectedID = draft[currentPick];
    const imageLink = (selectedID && selectedID !== 'none') 
        ? require('../../../assets/champion/' + selectedID + '.png').default 
        : NoneIcon;


    const getChampionData = (property) => {
        if(currentPick >= 20) return 'Finished';
        if(championsList === null || !selectedID ) return '---';
        if(selectedID === 'none') return 'None';
        return championsList[selectedID][property];
    }

    useEventListener('keypress', (e) => {
        if(e.keyCode === 13) lockin();
    });

    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect className="select" select={select} disabled={disabled} hasNoneOption={!PICKS.has(currentPick)}/>
            <div className="selected-controls card__component">
                <div className="selected-display">
                    <img src={imageLink} alt={selectedID}/>
                    <h3>{getChampionData('name')}</h3>
                    <span>{getChampionData('title')}</span>
                </div>
                <div className="controls">
                    <button className="lock-in" onClick={lockin} disabled={!draft[currentPick]}>lock in</button>
                    <button className="undo" onClick={undo} disabled={currentPick <= 0}>undo</button>
                </div>
            </div>
        </div>
    );
}

export default ChampionSelectionDisplay;
