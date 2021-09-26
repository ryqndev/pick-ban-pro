import { useState, useEffect } from 'react';

const TournamentQuickView = ({ tournamentName, list }) => {
	const [details, setDetails] = useState(null);

	useEffect(() => {
		if (!list || !tournamentName) return;
		setDetails(list.find(({ path }) => path === tournamentName));
	}, [tournamentName, list]);

	if (!tournamentName)
		return (
			<div>Select a tournament from the left to see general details</div>
		);

	if (details === null) return <div>Loading...</div>;

	return (
		<div>
			<h1>{details['full-name']}</h1>
			{/* {details} */}
			{/* {JSON.stringify(data)} */}
		</div>
	);
};

export default TournamentQuickView;
