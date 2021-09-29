import clsx from 'clsx';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { TournamentQuickView } from './components';
import cn from './TournamentListView.module.scss';

const TournamentListView = () => {
	const [tournamentName, setTournamentName] = useState('');
	const {
		isLoading,
		error,
		data: list,
	} = useQuery('tournamentListData', () =>
		fetch(process.env.PUBLIC_URL + '/prodrafts/tournaments/list.json').then(
			res => res.json()
		)
	);

	return (
		<main className={cn.container}>
			<h1 className={cn.title}>Tournaments</h1>
			<div>
			{/* Spacing unit but should be leftmost nav */}
			</div>
			<div>
				<div className={cn.list}>
					<div className={clsx(cn['list-item'], cn.header)}>
						<p>Start</p>
						<p>End</p>
						<p>Name</p>
						<p>Region</p>
					</div>
					{isLoading && (
						<p className={cn['error-message']}>Loading...</p>
					)}
					{error && (
						<p className={cn['error-message']}>
							Something went wrong...
						</p>
					)}
					{list &&
						list.map(
							({ path, region, name, start, end, ...item }) => (
								<button
									key={path}
									className={clsx(
										cn['list-item'],
										tournamentName === path && cn.selected
									)}
									onClick={() => setTournamentName(path)}
								>
									<p>
										{new Date(start)
											.toDateString()
											.substr(4)}
									</p>
									<p>
										{new Date(end).toDateString().substr(4)}
									</p>
									<p>{item['full-name']}</p>
									<p>{region}</p>
								</button>
							)
						)}
				</div>
			</div>
			<aside>
				<TournamentQuickView {...{ tournamentName, list }} />
			</aside>
		</main>
	);
};

export default TournamentListView;
