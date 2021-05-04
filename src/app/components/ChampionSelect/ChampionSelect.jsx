import './ChampionSelect.scss';

const ChampSelect = ({select}) => {
    return (
        <div className="champ-select--wrapper">
            <input type="text" id="input" /><button onClick={() => {select(document.getElementById('input').value)}}>add</button>
        </div>
    );
}

export default ChampSelect;
