import { useState, useContext, useEffect, memo } from 'react';
import ChampionsContext from '../../controller/contexts/ChampionsContext';
import Fuse from 'fuse.js';
import roles from '../../assets/roles.json';
import ChampionIcon from './ChampionIcon';
import RoleFilter from './RoleFilter';
import clsx from 'clsx';
import './ChampionSelect.sass';

const options = {
	isCaseSensitive: false,
	shouldSort: false,
	threshold: 0.2,
	keys: ['name', 'tags', 'title'],
};

const ChampSelect = ({ className, select, disabled, hasNoneOption }) => {
	const { championsList } = useContext(ChampionsContext);
	const [filteredChampionsList, setFilteredChampionsList] =
		useState(championsList);
	const [roleFilter, setRoleFilter] = useState(null);
	const [search, setSearch] = useState('');
	const [fuse, setFuse] = useState(() => new Fuse([], options));
	const [results, setResults] = useState([]);
	const [cachedFullList, setCachedFullList] = useState([]);

	const handleChange = event => {
		event.preventDefault();
        console.log(event.target.value);
		setSearch(event.target.value);
	};

	useEffect(() => {
		if (!roleFilter) return setFilteredChampionsList(championsList);
		setFilteredChampionsList(
			Object.fromEntries(
				roles[roleFilter].map(champ => [champ, championsList[champ]])
			)
		);
	}, [roleFilter, championsList]);

	useEffect(() => {
		if (filteredChampionsList === null) return;

		let championsKeys = Object.keys(filteredChampionsList).sort((a, b) =>
			filteredChampionsList[a].name.localeCompare(
				filteredChampionsList[b].name
			)
		);
		let sortedChampionData = championsKeys.map(championID => {
			const { id, name, title, tags } = filteredChampionsList[championID];
			return { id, name, title, tags };
		});
		setCachedFullList(
			sortedChampionData.map(championData => ({ item: championData }))
		);
		setFuse(new Fuse(sortedChampionData, options));
	}, [filteredChampionsList]);

	useEffect(() => {
		if (search.length === 0) return setResults(cachedFullList);
		setResults(fuse.search(search));
	}, [fuse, search, cachedFullList]);

	return (
		<div className={clsx('champion-select--wrapper', className)}>
			<div className='filter-options card__component'>
				<RoleFilter
					roleFilter={roleFilter}
					setRoleFilter={setRoleFilter}
				/>
				<input type='text' value={search} onChange={handleChange} />
			</div>
			<div className='results'>
				<div className='resizable-container'>
					{hasNoneOption && (
						<ChampionIcon
							key='@ryqndev/no-ban'
							item={{ id: 'none', name: 'None' }}
							select={select}
						/>
					)}
					{results.map(result => (
						<ChampionIcon
							key={result.item.id}
							disabled={disabled.has(result.item.id)}
							select={select}
							{...result}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(ChampSelect);
