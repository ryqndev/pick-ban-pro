import './ChampionBan.scss';

const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionBan = ({name, id}) => {
    const iconSource = id ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg` : transparentImageBase64;

    return (
        <div className="champion-ban--wrapper">
            <h4>{name}</h4>
            <img src={iconSource} alt={name}/>
        </div>
    );
}

export default ChampionBan;
