
const ChampionIcon = ({item: {name, id}, select}) => {
    return (
        <div onClick={() => {select(id)}}>
            {name} {id}
        </div>
    );
}

export default ChampionIcon;
