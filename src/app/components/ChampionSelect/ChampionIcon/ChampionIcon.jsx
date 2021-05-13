import NoneIcon from '../../../assets/square.png';
import './ChampionIcon.scss';

const ChampionIcon = ({item: {name, id}, select, disabled}) => {
    const imageLink = id !== 'none' ? require('../../../assets/champion/' + id + '.png').default : NoneIcon;

    const handleClick = (e) => {
        select(id);
    }
    
    return (
        <button className="champion-icon--wrapper" onClick={handleClick} disabled={disabled}>
            <img src={imageLink} alt={name}/>
            <p>{name}</p>
        </button>
    );
}

export default ChampionIcon;
