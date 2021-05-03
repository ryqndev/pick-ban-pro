import './ChampionPick.scss';

const ChampionPick = ({left}) => {
    return (
        <div className={`pick ${left ? 'left' : 'right'}`}></div>

    );
}

export default ChampionPick;
