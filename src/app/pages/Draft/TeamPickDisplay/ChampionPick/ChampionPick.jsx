import clsx from 'clsx';
import { memo } from 'react';
import './ChampionPick.scss';

const transparentImageBase64 =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionPick = ({ className, name, num, isBlue  }) => {
	const iconSource = num
		? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${num}/${num}000.jpg`
		: transparentImageBase64;
        
	return (
		<div
			className={clsx(
				'champion-pick--wrapper',
				isBlue ? 'left' : 'right',
				className
			)}
		>
			<div
				className='pick'
				style={{
					backgroundImage: `url('${iconSource}')`,
					backgroundPosition: `12% 12%`,
                    backgroundSize: '140%',
                    backgroundRepeat: 'no-repeat'
				}}
			>
				<span>Picking...</span>
				<h3>{name}</h3>
			</div>
		</div>
	);
};

export default memo(ChampionPick);
