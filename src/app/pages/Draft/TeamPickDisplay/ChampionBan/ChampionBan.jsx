import './ChampionBan.scss';

const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionBan = ({name, id, currentPick}) => {
    const iconSource = id ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg` : transparentImageBase64;

    return (
        <div className={`champion-ban--wrapper ${currentPick ? 'currently-picking' : ''}`}>
            <h4>{name}</h4>
            <img src={transparentImageBase64} alt={name} style={{position: 'absolute'}}/>
            <img src={iconSource} alt={name} style={{opacity: id ? 1 : 0}}/>
            {currentPick && (<span>BANNING</span>)}
        </div>
    );
}

export default ChampionBan;
