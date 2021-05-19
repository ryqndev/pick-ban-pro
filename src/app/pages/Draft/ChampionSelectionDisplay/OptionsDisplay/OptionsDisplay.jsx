import {useContext} from 'react';
import ChampionsContext from '../../../../controller/contexts/ChampionsContext';
import {writeDraftString} from '../../../../controller/draftLogicControllerUtil.js';
import './OptionsDisplay.scss';

const OptionsDisplay = ({open, options, draft}) => {
    const {championsList} = useContext(ChampionsContext);

    return (
        <div className="options-display--wrapper" style={{maxHeight: open ? '250px' : 0 + 'px'}}>
            <div className="content card__component">
                <h2>Share Your Draft!</h2>
                <input type="text" readOnly value={`${window.location.host}/draft/${writeDraftString(draft, championsList).join('')}`}/>
            </div>
        </div>
    );
}

export default OptionsDisplay;
