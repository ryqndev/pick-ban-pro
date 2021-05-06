import {useContext} from 'react';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionSelect from '../../../components/ChampionSelect';
import NoneIcon from '../../../assets/square.png';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({lockin, select, draft, currentPick}) => {
    const disabled = new Set(draft);
    const { championsList } = useContext(ChampionsContext);

    const selectedID = draft[currentPick];
    const imageLink = (selectedID && selectedID !== 'none') ? require('../../../assets/champion/' + selectedID + '.png').default : NoneIcon;
    const selectedName = selectedID 
            ? selectedID === 'none' 
                ? "None"
                : championsList[selectedID].name
            : "Select";
    const selectedTitle = selectedID 
        ? selectedID === 'none' 
            ? "---"
            : championsList[selectedID].title
        : "---";

    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect className="select" select={select} disabled={disabled}/>
            <div className="controls card__component">
                <div className="selected-display">
                    <img src={imageLink} alt={selectedID}/>
                    <h3>{selectedName}</h3>
                    <span>{selectedTitle}</span>
                </div>
                <button onClick={lockin}>lock in</button>
            </div>
        </div>
    );
}

export default ChampionSelectionDisplay;
