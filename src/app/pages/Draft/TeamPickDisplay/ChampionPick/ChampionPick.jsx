import './ChampionPick.scss';

const transparentImageBase64 = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionPick = ({ className='', name, isLeft, id}) => {
    const iconSource = id ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg` : transparentImageBase64;

    return (
        <div className={`champion-pick--wrapper ${isLeft ? 'left' : 'right'} ${className}`}>
            <div
                className={`pick`}
                style={{ backgroundImage: `url('${iconSource}')` }}
            >
                <h3>{name}</h3>
            </div>
        </div>
    );
}

export default ChampionPick;
