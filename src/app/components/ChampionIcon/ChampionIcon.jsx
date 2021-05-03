import './ChampionIcon.scss';

const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionIcon = ({name, patch='11.9.1'}) => {
    const iconSource = name ? `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${name}.png` : transparentImageBase64;
    return (
        <div className="champion-icon--wrapper">
            <img src={iconSource} alt={name}/>
        </div>
    );
}

export default ChampionIcon;
