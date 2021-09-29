import clsx from 'clsx';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import cn from './TournamentView.module.scss';

const TournamentView = () => {
	const { tournamentName } = useParams();
	const {
		isLoading,
		error,
		data: tournament,
	} = useQuery('tournamentData' + tournamentName, () =>
		fetch(
			process.env.PUBLIC_URL +
				'/prodrafts/tournaments/' +
				tournamentName +
				'.json'
		).then(res => res.json())
	);

	if (isLoading) return <div className={cn['error-message']}>Loading...</div>;
	if (error) return <div className={cn['error-message']}>Something went wrong...</div>;

	return (
		<div className={cn.container}>
			<TournamentList data={tournament} />
		</div>
	);
};

const TournamentList = ({ data }) => {
	return (
		<div className={cn['tournament-list--page']}>
			<div className={cn.tournament}>
				<h1>{data['name']}</h1>
				{data.stages.map((stage, i) => (
					<StageList
						key={i}
						tournament={data.name}
						teamNames={data.teams}
						{...stage}
					/>
				))}
			</div>
		</div>
	);
};

const StageList = ({ tournament, name, games, teamNames }) => {
	return (
		<div className={cn.stage}>
			<h2>{name}</h2>
			<div className={cn.scroller}>
				<div className={cn['scroll-content--holder']}>
					{games.map((game, i) => (
						<DayList
							key={i}
							tournament={tournament}
							teamNames={teamNames}
							{...game}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
const DayList = ({ tournament, date, games, teamNames }) => {
    const parsedDate = new Date(date);
	return (
		<div className={clsx(cn.day, 'card__component')} key={date}>
			<h3>{isNaN(parsedDate) ? date : parsedDate.toDateString()}</h3>
			{games.map((match, i) =>
				match.type === 'series' ? (
					<Series
						key={i}
						{...match}
						teamNames={teamNames}
						tournament={tournament}
					/>
				) : (
					<Single
						key={i}
						{...match}
						teamNames={teamNames}
						tournament={tournament}
					/>
				)
			)}
		</div>
	);
};

const Single = ({ tournament, blue, red, patch, draft, teamNames }) => {
	return (
		<div className={cn.match}>
			<Link to={`/d/${tournament}/${teamNames[blue]},${teamNames[red]}/${draft}`}>
				{teamNames[blue]} vs. {teamNames[red]}
			</Link>
		</div>
	);
};

const Series = ({ tournament, teams, patch, games, teamNames }) => {
	const t1 = teamNames[teams[0]],
		t2 = teamNames[teams[1]];

	return (
		<div className={cn.match}>
			<h3>{t1} vs. {t2}</h3>
            Game: 
			{games.map((game, i) => (
				<Link
					to={`/d/${tournament}/${teamNames[game.blue]},${
						teamNames[game.red]
					}/${game.draft}`}
                    className={cn['game-select']}
				>
					{i + 1}
				</Link>
			))}
		</div>
	);
};

export default TournamentView;
