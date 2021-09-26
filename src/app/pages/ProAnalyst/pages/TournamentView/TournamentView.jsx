import clsx from 'clsx';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { TournamentQuickView } from './components';
import cn from './TournamentView.module.scss';

const TournamentView = () => {
	const { tournamentName } = useParams();

	const {
		isLoading,
		error,
		data: list,
	} = useQuery('tournamentData', () =>
		fetch(process.env.PUBLIC_URL + '/prodrafts/tournaments/list.json').then(
			res => res.json()
		)
	);

	return (
		<main className={cn.container}>
            <h1 className={cn.title}>Tournaments</h1>
            <div></div>
			<div className={cn.list}>
				<div className={clsx(cn['list-item'], cn.header)}>
					<p>Start</p>
					<p>End</p>
					<p>Name</p>
					<p>Region</p>
				</div>
				{isLoading && <p>Loading...</p>}
				{error && <p>Something went wrong...</p>}
				{list &&
					list.map(({ path, region, name, start, end, ...item }) => (
						<Link
							to={'/list/tournaments/' + path}
							key={path}
							className={clsx(
								cn['list-item'],
								tournamentName === path && cn.selected
							)}
						>
							<p>{new Date(start).toDateString().substr(4)}</p>
							<p>{new Date(end).toDateString().substr(4)}</p>
							<p>{item['full-name']}</p>
							<p>{region}</p>
						</Link>
					))}
			</div>
			<aside>
				<div className={cn['tournament-quick-view']}>
					<TournamentQuickView {...{tournamentName, list}} />
				</div>
			</aside>
		</main>
	);
};

export default TournamentView;
