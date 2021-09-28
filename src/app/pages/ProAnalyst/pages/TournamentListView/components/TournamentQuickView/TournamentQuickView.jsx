import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from './TournamentQuickView.module.scss';

const TournamentQuickView = ({ tournamentName, list }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!list || !tournamentName) return;
		setData(list.find(({ path }) => path === tournamentName));
	}, [tournamentName, list]);

	if (!tournamentName)
		return (
			<div className={clsx(cn.container, cn['error-state'])}>
				Select a tournament from the left to see general data
			</div>
		);

	if (data === null)
		return (
			<div className={clsx(cn.container, cn['error-state'])}>
				Loading...
			</div>
		);

	return (
		<div className={cn.container}>
			<h2>{data['full-name']}</h2>
			<p className={cn.date}>
				{new Date(data.start).toLocaleDateString('en-US')}{' '}
				<span> to </span>{' '}
				{new Date(data.end).toLocaleDateString('en-US')}
			</p>
			<ul>
				<lh>Teams: </lh>
				{data.teams.map(team => (
					<li>{team}</li>
				))}
			</ul>
			<Link to={data.path} className={cn.view}>View drafts</Link>
		</div>
	);
};

export default TournamentQuickView;
