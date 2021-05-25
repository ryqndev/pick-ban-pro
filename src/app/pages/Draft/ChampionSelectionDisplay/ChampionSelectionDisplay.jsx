import {useContext, useRef, useEffect, useState, memo} from 'react';
import {PICKS} from '../../../controller/draftLogicControllerUtil.js';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionSelect from '../../../components/ChampionSelect';
import OptionsDisplay from './OptionsDisplay';
import NoneIcon from '../../../assets/square.png';
import {ReactComponent as SettingsIcon} from '../../../assets/settings.svg';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({draft, currentPick, children, ...actions}) => {
    const [disabled, setDisabled] = useState(new Set(draft));

    useEffect(() => {
        setDisabled(new Set(draft));
    }, [draft]);

    const { championsList } = useContext(ChampionsContext);
    const [showOptions, setShowOptions] = useState(false);
    const lockinButtonRef = useRef(null);

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

    useEffect(() => { lockinButtonRef.current.focus() }, [draft]);

    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect 
                className="select"
                select={actions.select}
                disabled={disabled}
                hasNoneOption={!PICKS.has(currentPick)}
            />
            <OptionsDisplay open={showOptions} draft={draft}>
                {children}
            </OptionsDisplay>   
            <div className="selected-controls card__component">
                <div className="selected-display">
                    <img src={imageLink} alt={selectedID}/>
                    <h3>{getChampionData('name')}</h3>
                    <span>{getChampionData('title')}</span>
                </div>
                <div className="controls">
                    <button
                        className="lock-in"
                        ref={lockinButtonRef}
                        onClick={actions.lockin}
                        disabled={!draft[currentPick]}
                    >
                        lock in
                    </button>
                    <button 
                        className={`settings ${showOptions ? 'active' : ''}`}
                        onClick={() => {setShowOptions(prevOption => !prevOption)}}
                    >
                        <SettingsIcon />
                    </button>
                    <button 
                        className="undo"
                        onClick={actions.undo}
                        disabled={currentPick <= 0}
                    >
                        undo
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(ChampionSelectionDisplay);
