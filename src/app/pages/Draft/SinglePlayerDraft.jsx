import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import './Draft.scss';

const SinglePlayerDraft = ({
	setNav,
	spectators,
	update,
	peerID,
}) => {
	const { draftString } = useParams();
	const {
		settings,
		draft: { blue, red, ...draft },
		actions,
	} = useDraftHost(
		setNav,
		spectators,
		update,
		false,
		draftString
	);

	return (
		<main className='draft--wrapper'>
			<div className='pickban-select--wrapper'>
				<TeamPickDisplay
					currentPick={draft.currentPick}
					teamRenderData={blue}
					side='blue'
				/>
				<ChampionSelectionDisplay
					{...draft}
					{...actions}
					settings={{
						...settings,
						spectators,
						peerID,
						type: 'HOST',
					}}
				/>
				<TeamPickDisplay
					currentPick={draft.currentPick}
					teamRenderData={red}
					side='red'
				/>
			</div>
		</main>
	);
};

export default memo(SinglePlayerDraft);
