import useDraftClient from '../../controller/hooks/useDraftClient';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const SpectateDraft = ({ setNav }) => {
	const { draft, currentPick, render, data } =
		useDraftClient(setNav);

	if (!data || data.settingUp)
		return (
			<main className='draft--wrapper wait-ready-check'>
				<h1>Waiting for host to start...</h1>
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
					settings={{ type: 'spectator' }}
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

export default SpectateDraft;
