import { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import useFirestoreDraft from '../../controller/hooks/useFirestoreDraft';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const RedDraft = ({
	setNavigationContent,
}) => {
    const {id, hash} = useParams();
	const { actions, draft, currentPick, render, data} =
		useFirestoreDraft(setNavigationContent, id, hash);

    const lockinWithReadyCheck = () => {

    }
	if(!data || data.settingUp) return (<div></div>)

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
					lockin={lockinWithReadyCheck}
					settings={{
                        type: 'red',
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

export default memo(RedDraft);
