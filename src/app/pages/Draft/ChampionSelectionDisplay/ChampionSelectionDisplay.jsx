import { useEffect, useState, memo } from 'react';
import { PICKS } from '../../../controller/draftLogicControllerUtil.js';
import ChampionSelect from '../../../components/ChampionSelect';
import OptionsDisplay from './OptionsDisplay';
import StateDisplay from './StateDisplay';
import './ChampionSelectionDisplay.scss';

const ChampionSelectionDisplay = ({ d, p, settings, ...props }) => {
	const [disabled, setDisabled] = useState(new Set(d));
	useEffect(() => setDisabled(new Set(d)), [d]);
	const [showOptions, setShowOptions] = useState(false);

	return (
		<div className='champion-select-display--wrapper'>
			<ChampionSelect
				className='select'
				select={settings.type === 'spectator' ? () => {} : props.select}
				disabled={disabled}
				hasNoneOption={!PICKS.has(p)}
			/>

			<OptionsDisplay
				open={showOptions}
				setOpen={setShowOptions}
				draft={d}
				{...settings}
				{...props}
			/>

			<StateDisplay
				d={d}
				p={p}
				setShowOptions={setShowOptions}
				{...settings}
				{...props}
			/>
		</div>
	);
};

export default memo(ChampionSelectionDisplay);
