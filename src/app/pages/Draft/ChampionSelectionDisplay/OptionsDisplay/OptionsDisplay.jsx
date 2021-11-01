import { memo, useState } from 'react';
import clsx from 'clsx';
import { Links } from '../../../../components/PeerDisplays';
import { DraftSettings } from './pages';
import { useParams } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import cn from './OptionsDisplay.module.scss';

const OptionsDisplay = ({ open, ...settings }) => {
	const [tab, setTab] = useState('Settings');
	const { id } = useParams();

	return (
		<div className={clsx(cn.container, open && cn.open)}>
			<div className={clsx(cn.content, 'card__component')}>
				<nav className={cn['options-tabs']}>
					{['Settings', 'Participants'].map(word => (
						<button
							key={word}
							className={clsx(tab === word && cn.selected)}
							onClick={() => setTab(word)}
						>
							{word}
						</button>
					))}
					{/* <button className={clsx(tab === 'counters' && cn.selected)} onClick={() => setTab('counters')}>Counters</button> */}
					<button
						className={cn.close}
						onClick={() => settings.setOpen(false)}
					>
						<CancelIcon />
					</button>
				</nav>
				<div
					className={clsx(cn.page, tab !== 'Settings' && cn.rounded)}
				>
					<div>
						{tab === 'Settings' && (
							<DraftSettings
								className={cn.small}
								{...settings.options}
							/>
						)}
						{tab === 'Participants' && (
							<Links className={cn.small} roomid={id} />
						)}
						{tab === 'Counters' && (
							<iframe
								id={cn.counters}
								title='Quinn Counters'
								width='100%'
								// TODO: for testing purposes only. contact for permission to iframe
								src='https://app.mobalytics.gg/lol/champions/quinn/counters'
								// src="https://na.op.gg/champion/quinn/statistics/top/matchup"
							></iframe>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(OptionsDisplay);
