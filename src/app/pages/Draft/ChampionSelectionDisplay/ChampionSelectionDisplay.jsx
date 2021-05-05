import ChampionSelect from '../../../components/ChampionSelect';
import './ChampionSelectionDisplay.scss';


const ChampionSelectionDisplay = ({lockin, select}) => {
    return (
        <div>
            <ChampionSelect select={select}/>
            <button onClick={lockin}>lock in</button>
        </div>
    );
}

export default ChampionSelectionDisplay;
