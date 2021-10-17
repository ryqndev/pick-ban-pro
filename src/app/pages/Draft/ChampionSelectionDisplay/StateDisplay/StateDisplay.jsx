import { useContext, useRef, useEffect, memo } from 'react';
import ChampionsContext from '../../../../controller/contexts/ChampionsContext';
import {
	PICKS,
	BLUE_SIDE_PICKS,
} from '../../../../controller/draftLogicControllerUtil.js';
import ControlsDisplay from '../ControlsDisplay';
import NoneIcon from '../../../../assets/square.png';
import './StateDisplay.scss';

const StateDisplay = ({
	d,
	p,
	showOptions,
	setShowOptions,
	type,
	ready,
	...actions
}) => {
	const { championsList } = useContext(ChampionsContext);

	const lockinButtonRef = useRef(null);

	useEffect(() => {
		lockinButtonRef?.current?.focus();
	}, [d]);
	const selectedID = d[p];

	let imageLink;

	try {
		imageLink =
			selectedID && selectedID !== 'none'
				? require('../../../../assets/champion/' + selectedID + '.png')
						.default
				: NoneIcon;
	} catch (err) {
		imageLink = NoneIcon;
	}

	const stateTextDisplay = property => {
		if (p >= 20 || p <= -1 || !selectedID)
			return property === 'name' ? displayNameText() : displayTitleText();
		return displayChampionText(property);
	};

	const displayChampionText = property => {
		if (championsList === null || !selectedID) {
			if (type === 'spectator') return '---';
			if (property === 'name') return '---';
			return 'Select a champion';
		}
		if (selectedID === 'none') return 'None';
		return championsList[selectedID][property];
	};

	const displayNameText = () => {
		const DRAFT_NOT_STARTED = p <= -1,
			DRAFT_IS_FINISHED = p >= 20;

		if (DRAFT_NOT_STARTED) return '---';
		if (DRAFT_IS_FINISHED) return 'Finished';

		if (type === 'spectator') return '---';
		if (PICKS.has(p)) return 'Picking...';
		return 'Banning...';
	};

	const displayTitleText = () => {
		const DRAFT_NOT_STARTED = p <= -1,
			DRAFT_IS_FINISHED = p >= 20;

		if (DRAFT_IS_FINISHED) return 'Finished';

		if (type === 'blue' || type === 'red') {
			const isCurrentPlayerTurn = BLUE_SIDE_PICKS.has(p)
				? type === 'blue'
				: type === 'red';

			if (DRAFT_NOT_STARTED) {
				if (!ready[type === 'blue' ? 0 : 1])
					return 'Click [READY] to ready up';
				return 'Waiting for enemy to ready up';
			}
			if (PICKS.has(p)) {
				if (isCurrentPlayerTurn) return 'Pick a champion';
				return 'Waiting for enemy pick';
			}
			if (isCurrentPlayerTurn) return 'Ban a champion';
			return 'Waiting for enemy ban';
		}

		if (DRAFT_NOT_STARTED)
			return type === 'spectator' ? 'Waiting for teams to ready...' : 'Click [START] to begin';

		const TEAM_TO_MOVE = BLUE_SIDE_PICKS.has(p) ? 'Blue Team' : 'Red Team';

		return TEAM_TO_MOVE + (PICKS.has(p) ? ' pick' : ' bann') + 'ing...';
	};

	return (
		<div className='selected-controls--wrapper card__component'>
			<div className='selected-display'>
				<img src={imageLink} alt={selectedID} />
				<h3>{stateTextDisplay('name')}</h3>
				<span>{stateTextDisplay('title')}</span>
			</div>
			{!(type === 'spectator') && (
				<ControlsDisplay
					showOptions={showOptions}
					setShowOptions={setShowOptions}
					lockinButtonRef={lockinButtonRef}
					actions={actions}
					draft={{ d, p }}
				/>
			)}
		</div>
	);
};

export default memo(StateDisplay);
