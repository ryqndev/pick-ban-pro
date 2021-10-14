import clsx from 'clsx';
import { memo } from 'react';
import { PICKS } from '../../../../controller/draftLogicControllerUtil.js';
import { ReactComponent as SettingsIcon } from '../../../../assets/settings.svg';

const ControlsDisplay = ({
	lockinButtonRef,
	type,
	actions,
	draft,
	setShowOptions,
	showOptions,
}) => {
	const mainButtonText = () => {
		if (draft.p <= -1)
			return type === 'blue' || type === 'red' ? 'ready' : 'start';
            
		if (draft.p >= 20) return '';

		return PICKS.has(draft.p) ? 'lock in' : 'ban';
	};

	return (
		<div className='controls'>
			<button
				className={clsx('lock-in', draft.p === -1 && 'start')}
				ref={lockinButtonRef}
				onClick={actions.lockin}
				disabled={draft.p !== -1 && !draft.d[draft.p]}
			>
				{mainButtonText()}
			</button>
			<button
				className={clsx('settings', showOptions && 'active')}
				onClick={() => {
					setShowOptions(prevOption => !prevOption);
				}}
			>
				<SettingsIcon />
			</button>
			<button
				className='undo'
				onClick={actions.undo}
				disabled={draft.p <= 0}
			>
				undo
			</button>
		</div>
	);
};

export default memo(ControlsDisplay);
