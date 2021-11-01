import { memo } from 'react';
import EmptyBanImage from '../../../../assets/square.png';
import cn from './ChampionBan.module.scss';
import clsx from 'clsx';

const transparentImageBase64 =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

const ChampionBan = ({ name, id, currentPick }) => {
	const iconSource = id
		? id === 'none'
			? EmptyBanImage
			: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`
		: transparentImageBase64;

	const isLongName = name => {
		if (!name) return false;
		for (name of name.split(' ')) if (name.length > 8) return true;
		return false;
	};

	return (
		<div
			className={clsx(
				cn.container,
				currentPick && cn.picking,
				id === 'none' && cn.none
			)}
		>
			<h4 className={clsx(isLongName(name) && cn.long)}>{name}</h4>
			<img
				src={transparentImageBase64}
				alt={name}
                className={cn['no-image']}
			/>
			<img src={iconSource} alt={name} style={{ opacity: id ? 1 : 0 }} />
			{currentPick && <span>BANNING</span>}
		</div>
	);
};

export default memo(ChampionBan);
