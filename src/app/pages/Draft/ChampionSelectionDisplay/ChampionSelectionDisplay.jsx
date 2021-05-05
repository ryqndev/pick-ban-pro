import ChampionSelect from '../../../components/ChampionSelect';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({lockin, select}) => {
    return (
        <div className="champion-select-display--wrapper">
            <ChampionSelect className="select" select={select}/>
            <div className="controls">
                <button onClick={lockin}>lock in</button>
            </div>
        </div>
    );
}

export default ChampionSelectionDisplay;
