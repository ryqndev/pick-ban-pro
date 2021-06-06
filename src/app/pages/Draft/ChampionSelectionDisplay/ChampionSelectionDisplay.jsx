import { useContext, useRef, useEffect, useState, memo } from 'react';
import { PICKS } from '../../../controller/draftLogicControllerUtil.js';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionSelect from '../../../components/ChampionSelect';
import OptionsDisplay from './OptionsDisplay';
import ControlsDisplay from './ControlsDisplay';
import NoneIcon from '../../../assets/square.png';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({ d, p, children, spectator, ...actions }) => {
    const [disabled, setDisabled] = useState(new Set(d));

    useEffect(() => setDisabled(new Set(d)), [d]);

    const { championsList } = useContext(ChampionsContext);
    const [showOptions, setShowOptions] = useState(false);
    const lockinButtonRef = useRef(null);

    const selectedID = d[p];
    const imageLink = (selectedID && selectedID !== 'none')
        ? require('../../../assets/champion/' + selectedID + '.png').default
        : NoneIcon;

    const stateTextDisplay = (property) => {
        if (p >= 20) return 'Finished';
        if (p <= -1) {
            if (property === 'name') return 'Ready';
            return spectator ? 'Waiting to start...' : 'Click [START] to begin';
        }
        if (championsList === null || !selectedID) return spectator || property === 'name' ? '---' : 'Select a champion';
        if (selectedID === 'none') return 'None';
        return championsList[selectedID][property];
    }

    useEffect(() => { lockinButtonRef?.current?.focus() }, [d]);

    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect
                className="select"
                select={spectator ? () => { } : actions.select}
                disabled={disabled}
                hasNoneOption={!PICKS.has(p)}
            />

            <OptionsDisplay open={showOptions} draft={d}>
                {children}
            </OptionsDisplay>

            <div className="selected-controls card__component">
                <div className="selected-display">
                    <img src={imageLink} alt={selectedID} />
                    <h3>{stateTextDisplay('name')}</h3>
                    <span>{stateTextDisplay('title')}</span>
                </div>
                {!spectator && <ControlsDisplay
                    showOptions={showOptions}
                    setShowOptions={setShowOptions}
                    lockinButtonRef={lockinButtonRef}
                    actions={actions}
                    draft={{ d, p }} />}
            </div>
        </div>
    );
}

export default memo(ChampionSelectionDisplay);
