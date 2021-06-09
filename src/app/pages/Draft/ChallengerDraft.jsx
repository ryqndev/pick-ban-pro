import { useState } from 'react';
import useDraftClient from '../../controller/hooks/useDraftClient';
import {
	promptUndoRequest,
	promptTimerToggleRequest,
} from '../../controller/libs/sweetalert';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const ChallengerDraft = ({ send, ...props }) => {
	const { draft, readyCheck, settings, isBlue } = useDraftClient({
		type: 'challenger',
        send,
		...props,
	});
	// const [confirmationHash,  .setConfirmationHash] = useState(null);

	const lockin = () => {
		if (draft.p === -1) send({ type: 'READY_UP' });
		else send({ type: 'LOCK_IN', state: draft.p });
	};
	const select = champion => {
		send({ type: 'SELECT', content: champion, state: draft.p });
	};
	const undo = () => {
		promptUndoRequest(() => send({ type: 'UNDO', state: draft.p }));
	};
	const setOn = () => {
		promptTimerToggleRequest(settings.on, () =>
			send({ type: 'TIMER_TOGGLE_REQUEST', content: !settings.on })
		);
	};

	if (!readyCheck)
		return (
			<main className='draft--wrapper wait-ready-check'>
				<h1>Waiting for host to start...</h1>
			</main>
		);

	return (
		<main className='draft--wrapper'>
			<div className='pickban-select--wrapper'>
				<TeamPickDisplay
					currentPick={draft.currentPick}
					teamRenderData={draft.blue}
					side='blue'
				/>
				<ChampionSelectionDisplay
					{...draft}
					select={select}
					lockin={lockin}
					undo={undo}
					multiplayer
					settings={{
						setOn,
						setLimit: () => {},
						isBlue,
						type: 'CLIENT',
						peerID: settings.id,
						readyCheck,
						...settings,
					}}
				/>
				<TeamPickDisplay
					currentPick={draft.currentPick}
					teamRenderData={draft.red}
					side='red'
				/>
			</div>
		</main>
	);
};

export default ChallengerDraft;
