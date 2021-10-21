import { memo } from 'react';
import { useParams } from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import useFirestoreDraft from '../../controller/hooks/useFirestoreDraft';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const MultiplayerDraft = ({ setNav, side }) => {
	const { id, hash } = useParams();
	const { actions, draft, currentPick, render, data } = useFirestoreDraft(
		setNav,
		id,
		hash,
		side
	);

	if (!data || data.settingUp)
		return (
			<main className='draft--wrapper wait-ready-check'>
				<h1>Waiting for host to finalize draft settings...</h1>
			</main>
		);

	return (
		<main className='draft--wrapper'>
			<div className='pickban-select--wrapper'>
				<TeamPickDisplay
					currentPick={currentPick}
					teamRenderData={render.blue}
					side='blue'
				/>
				<ChampionSelectionDisplay
					{...data}
					{...draft}
					{...actions}
					settings={{
						type: side,
					}}
				/>
				<TeamPickDisplay
					currentPick={currentPick}
					teamRenderData={render.red}
					side='red'
				/>
			</div>
		</main>
	);
};

export default memo(MultiplayerDraft);
