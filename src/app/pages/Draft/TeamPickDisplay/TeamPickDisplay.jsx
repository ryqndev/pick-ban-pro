import clsx from 'clsx';
import { useContext, memo } from 'react';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';
import ChampionBan from './ChampionBan';
import ChampionPick from './ChampionPick';
import './TeamPickDisplay.scss';

const BAN_1_START = 0;
const BAN_1_END = 2;
const PICK_1_START = 3;
const PICK_1_END = 5;
const BAN_2_START = 6;
const BAN_2_END = 7;
const PICK_2_START = 8;
const PICK_2_END = 10;

/**
 * @note Using the loop index as a key for all component loops because the number of items in the array should
 * never change... unless the game itself changes
 */
const TeamPickDisplay = ({ side, currentPick, teamRenderData }) => {
	const championContextData = useContext(ChampionsContext);

	const getChampionData = championID => {
		if (
			!championID ||
			championID === 'none' ||
			!championContextData.championsList
		)
			return { id: championID };
		return {
			name: championContextData.championsList[championID].name,
            num: championContextData.championsList[championID].key,
			id: championID,
		};
	};

	const isCurrentPick = index =>
		side === currentPick.side && index === currentPick.index;

	return (
		<div className='team-pick-display--wrapper'>
			<div className='ban-row phase-1'>
				{teamRenderData
					.slice(BAN_1_START, BAN_1_END + 1)
					.map((champion, index) => (
						<ChampionBan
							key={index}
							{...getChampionData(champion)}
							currentPick={isCurrentPick(index)}
						/>
					))}
			</div>
			{teamRenderData
				.slice(PICK_1_START, PICK_1_END + 1)
				.map((champion, index) => (
					<ChampionPick
						key={index}
						className={clsx(
							'pick',
							isCurrentPick(index + PICK_1_START) &&
								'currently-picking'
						)}
						isBlue={side === 'blue'}
						{...getChampionData(champion)}
					/>
				))}
			<div className='ban-row phase-2'>
				{teamRenderData
					.slice(BAN_2_START, BAN_2_END + 1)
					.map((champion, index) => (
						<ChampionBan
							key={index}
							{...getChampionData(champion)}
							currentPick={isCurrentPick(index + BAN_2_START)}
						/>
					))}
			</div>
			{teamRenderData
				.slice(PICK_2_START, PICK_2_END + 1)
				.map((champion, index) => (
					<ChampionPick
						key={index}
						className={clsx(
							'pick',
							isCurrentPick(index + PICK_2_START) &&
								'currently-picking'
						)}
						isBlue={side === 'blue'}
						{...getChampionData(champion)}
					/>
				))}
		</div>
	);
};

export default memo(TeamPickDisplay);
