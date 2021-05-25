import {useContext, useRef, useEffect, useState, memo} from 'react';
import {PICKS} from '../../../controller/draftLogicControllerUtil.js';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionSelect from '../../../components/ChampionSelect';
import OptionsDisplay from './OptionsDisplay';
import ControlsDisplay from './ControlsDisplay';
import NoneIcon from '../../../assets/square.png';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({draft, children, spectator, ...actions}) => {
    const [disabled, setDisabled] = useState(new Set(draft.d));

    useEffect(() => {
        setDisabled(new Set(draft.d));
    }, [draft.d]);

    const { championsList } = useContext(ChampionsContext);
    const [showOptions, setShowOptions] = useState(false);
    const lockinButtonRef = useRef(null);

    const selectedID = draft.d[draft.p];
    const imageLink = (selectedID && selectedID !== 'none') 
        ? require('../../../assets/champion/' + selectedID + '.png').default 
        : NoneIcon;


    const getChampionData = (property) => {
        if(draft.p >= 20) return 'Finished';
        if(championsList === null || !selectedID ) return '---';
        if(selectedID === 'none') return 'None';
        return championsList[selectedID][property];
    }

    useEffect(() => { lockinButtonRef?.current?.focus() }, [draft.d]);

    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect 
                className="select"
                select={spectator ? ()=>{} : actions.select}
                disabled={disabled}
                hasNoneOption={!PICKS.has(draft.p)}
            />
            <OptionsDisplay open={showOptions} draft={draft.d}>
                {children}
            </OptionsDisplay>   
            <div className="selected-controls card__component">
                <div className="selected-display">
                    <img src={imageLink} alt={selectedID}/>
                    <h3>{getChampionData('name')}</h3>
                    <span>{getChampionData('title')}</span>
                </div>
                {!spectator && <ControlsDisplay 
                    showOptions={showOptions} 
                    setShowOptions={setShowOptions} 
                    lockinButtonRef={lockinButtonRef} 
                    actions={actions} 
                    draft={draft} />}
            </div>
        </div>
    );
}

export default memo(ChampionSelectionDisplay);
