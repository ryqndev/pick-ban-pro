import EmptyBanImage from '../../../../assets/square.png';
import './ChampionBan.scss';

const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionBan = ({name, id, currentPick}) => {
    const iconSource = id ? id === 'none' ? EmptyBanImage : `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg` : transparentImageBase64;

    const isLongName = (name) => {
        if(!name) return false;
        for(name of name.split(' '))
            if(name.length > 8) return true;
        return false;
    }

    return (
        <div className={`champion-ban--wrapper ${currentPick ? 'currently-picking' : ''} ${id === 'none' ? 'none': ''}`}>
            <h4 className={isLongName(name) ? "long" : ""}>{name}</h4>
            <img src={transparentImageBase64} alt={name} style={{position: 'absolute', zIndex: -1}}/>
            <img src={iconSource} alt={name} style={{opacity: id ? 1 : 0}}/>
            {currentPick && (<span>BANNING</span>)}
        </div>
    );
}

export default ChampionBan;
