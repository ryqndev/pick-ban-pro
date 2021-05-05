import './ChampionIcon.scss';

const ChampionIcon = ({item: {name, id}, select}) => {
    const imageLink = id !== 'none' ? require('../../../assets/champion/' + id + '.png').default : 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    return (
        <div className="champion-icon--wrapper" onClick={() => {select(id)}}>
            <img src={imageLink} alt={name}/>
            <p>{name}</p>
        </div>
    );
}

export default ChampionIcon;
