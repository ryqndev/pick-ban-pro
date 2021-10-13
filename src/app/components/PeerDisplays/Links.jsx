import { memo, useState, useEffect } from 'react';
import ControlledTextInput from '../ControlledTextInput';
import cn from './Links.module.sass';

const Links = ({ roomid, blue, red }) => {
	return (
		<div className={cn.component}>
			<h1>
				Links
			</h1>
			<span>
				{!(blue && red)
					? 'Let people watch you as you draft'
					: 'Play against a friend and invite people to watch'}
			</span>

			{(blue && red) && (
				<>
					<label htmlFor='challenger-link' className={cn.blue}>
						Blue Side <span> (has first pick) </span>
					</label>
					<ControlledTextInput
						id='challenger-link'
						value={window.origin + '/blue/' + roomid + '/' + blue}
						readOnly
					/>
					<label htmlFor='challenger-link' className={cn.red}>
						Red Side <span> (has last pick) </span>
					</label>
					<ControlledTextInput
						id='challenger-link'
						value={window.origin + '/red/'+ roomid + '/' + red}
						readOnly
					/>
				</>
			)}

			<label htmlFor='spectator-link'>
				Spectator <span>to watch</span>
			</label>
			<ControlledTextInput
				id='spectator-link'
				value={window.origin + '/spectate/' + roomid}
				readOnly
			/>

			<span style={{ color: 'white' }}>
				{/* { spectators currently connected */}
			</span>
		</div>
	);
};

export default memo(Links);
