import { useState, useContext, useEffect } from 'react';
import ChampionsContext from '../../controller/contexts/ChampionsContext';
import Fuse from 'fuse.js';
import './ChampionSelect.scss';
import ChampionIcon from './ChampionIcon/ChampionIcon';

const options = {
    isCaseSensitive: false,
    shouldSort: false,
    threshold: 0.2,
    keys: [
        "name",
        "tags",
        "title",
    ],
};

const ChampSelect = ({ select }) => {
    const { championsList } = useContext(ChampionsContext);
    const [search, setSearch] = useState('');
    const [fuse, setFuse] = useState(new Fuse([], options));
    const [results, setResults] = useState([]);

    const handleChange = (event) => {
        event.preventDefault()
        setSearch(event.target.value);
    }

    useEffect(() => {
        if (championsList === null) return;

        let championsKeys = Object.keys(championsList).sort((a, b) => championsList[a].name.localeCompare(championsList[b].name));
        let sortedChampionData = championsKeys.map(championID => {
            const {
                id,
                name,
                title,
                tags,
            } = championsList[championID];
            return {id, name, title, tags}
        });
        setFuse(new Fuse(sortedChampionData, options))
    }, [championsList]);

    useEffect(() => {
        setResults(fuse.search(search));
    }, [fuse, search]);

    return (
        <div className="champ-select--wrapper">
            <input type="text" value={search} onChange={handleChange} />
            {results.map(result => <ChampionIcon key={result.id} {...result} select={select}/>)}
        </div>
    );
}

export default ChampSelect;
