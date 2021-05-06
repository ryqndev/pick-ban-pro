import { useState, useContext, useEffect } from 'react';
import ChampionsContext from '../../controller/contexts/ChampionsContext';
import Fuse from 'fuse.js';
import './ChampionSelect.scss';
import ChampionIcon from './ChampionIcon';

const options = {
    isCaseSensitive: false,
    shouldSort: false,
    threshold: 0.3,
    keys: [
        "name",
        "tags",
        "title",
    ],
};

const ChampSelect = ({className='', select, disabled}) => {
    const { championsList } = useContext(ChampionsContext);
    const [search, setSearch] = useState('');
    const [fuse, setFuse] = useState(new Fuse([], options));
    const [results, setResults] = useState([]);
    const [cachedFullList, setCachedFullList] = useState([]);

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
        setCachedFullList(sortedChampionData.map(championData => ({item: championData})));
        setFuse(new Fuse(sortedChampionData, options));
    }, [championsList]);

    useEffect(() => {
        if(search.length === 0) return setResults(cachedFullList);

        setResults(fuse.search(search));
    }, [fuse, search, cachedFullList]);

    return (
        <div className={`champion-select--wrapper ${className}`}>
            <div className="filter-options card__component">
                <div className="role-filter">
                    <p>T</p>
                    <p>J</p>
                    <p>M</p>
                    <p>B</p>
                    <p>S</p>
                </div>
                <input type="text" value={search} onChange={handleChange} />
            </div>
            <div className="results">
                <div className="resizable-container">
                    <ChampionIcon key='@ryqndev/no-ban' item={{id: 'none', name: 'None'}} select={select}/>
                    {results.map(result => 
                        <ChampionIcon 
                            key={result.item.id} 
                            disabled={disabled.has(result.item.id)}
                            select={select} 
                            {...result}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChampSelect;
