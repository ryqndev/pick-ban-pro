import {useState, useEffect} from 'react';

const useDDragonStaticAssets = () => {
    const [championsList, setChampionsList] = useState(null);
	const [patchList, setPatchList] = useState([]);
	const [patch, setPatch] = useState(null); 

	useEffect(() => {
		fetch('https://ddragon.leagueoflegends.com/api/versions.json')
			.then(res => res.json())
			.then(setPatchList);
	}, []);

	useEffect(() => {
		if(!patchList.length) return; // patchList array empty

        setPatch(patchList[0]);
	}, [patchList]);

    useEffect(() => {
        if(!patch) return; // patch has no value

        fetch(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
            .then(res => res.json())
            .then(res => setChampionsList(res.data));
    }, [patch]);

    return {
        championsList,
        patchList,
        patch,
        setPatch,
    };
}

export default useDDragonStaticAssets;
