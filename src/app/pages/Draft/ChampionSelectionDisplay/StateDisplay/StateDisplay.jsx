import { useContext, useRef, useEffect, memo } from 'react';
import ChampionsContext from '../../../../controller/contexts/ChampionsContext';
import ControlsDisplay from '../ControlsDisplay';
import NoneIcon from '../../../../assets/square.png';
import { PICKS, BLUE_SIDE_PICKS } from '../../../../controller/draftLogicControllerUtil';
import './StateDisplay.scss';

const StateDisplay = ({ d, p, showOptions, setShowOptions, multiplayer, spectator, ...actions }) => {
    const { championsList } = useContext(ChampionsContext);

    const lockinButtonRef = useRef(null);

    useEffect(() => { lockinButtonRef?.current?.focus() }, [d]);
    const selectedID = d[p];

    const imageLink = (selectedID && selectedID !== 'none')
        ? require('../../../../assets/champion/' + selectedID + '.png').default
        : NoneIcon;

    const stateTextDisplay = (property) => {
        if (p >= 20 || p <= -1 || !selectedID)
            return property === 'name' ? displayNameText() : displayTitleText();
        return displayChampionText(property);
    }

    const displayChampionText = (property) => {
        if (championsList === null || !selectedID) {
            if (spectator) return '---';
            if (property === 'name') return '---';
            return 'Select a champion';
        }
        if (selectedID === 'none') return 'None';
        return championsList[selectedID][property];
    }

    const displayNameText = () => {
        const DRAFT_NOT_STARTED = p <= -1, DRAFT_IS_FINISHED = p >= 20;

        if (DRAFT_NOT_STARTED) return '---';
        if (DRAFT_IS_FINISHED) return 'Finished';

        if (spectator) return '---';
        if (PICKS.has(p)) return 'Picking...';
        return 'Banning...';
    }

    const displayTitleText = () => {
        const DRAFT_NOT_STARTED = p <= -1, DRAFT_IS_FINISHED = p >= 20;

        if (DRAFT_IS_FINISHED) return 'Finished';

        if (multiplayer) {
            if (DRAFT_NOT_STARTED) {
                // if current player is not ready return 'Click [READY] to ready up';
                return 'Waiting for enemy to ready up';
            }
            if (PICKS.has(p)) {
                // if current players turn return 'Pick a champion';
                return 'Waiting for enemy pick';
            }
            // if current players turn return 'Ban a champion';
            return 'Waiting for enemy ban';
        }

        if (DRAFT_NOT_STARTED) return spectator ? 'Waiting to start...' : 'Click [START] to begin';

        const teamToMove = BLUE_SIDE_PICKS.has(p) ? 'Blue Team' : 'Red Team';

        return teamToMove + (PICKS.has(p) ? ' pick' : ' bann') + 'ing...';
    }

    return (
        <div className="selected-controls--wrapper card__component">
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
                multiplayer={multiplayer}
                draft={{ d, p }} />}
        </div>
    );
}

export default memo(StateDisplay);
