import { memo, useState, useEffect } from 'react';
import ControlledTextInput from '../ControlledTextInput';
import OpenInNewIcon from '@material-ui/icons/OpenInNewRounded';
import ContentPasteIcon from '@material-ui/icons/FileCopyRounded';
import cn from './Links.module.sass';
import clsx from 'clsx';

const Links = ({ roomid, blue, red, className }) => {
	const redLink = `${window.origin}/red/${roomid}/${red}`,
		blueLink = `${window.origin}/blue/${roomid}/${blue}`,
		specLink = `${window.origin}/spectate/${roomid}`;

	return (
		<div className={clsx(cn.container, className)}>
			<h1>Links</h1>
			<span>
				{!(blue && red)
					? 'Let people watch you as you draft'
					: 'Play against a friend and invite people to watch'}
			</span>

			{blue && red && (
				<>
					<div className={cn['action-container']}>
						<label htmlFor='challenger-link' className={cn.blue}>
							Blue Side <span> (has first pick) </span>
						</label>
					</div>
					<LinkText href={blueLink} />

					<label htmlFor='challenger-link' className={cn.red}>
						Red Side <span> (has last pick) </span>
					</label>
					<LinkText href={redLink} />
				</>
			)}

			<hr width="80%" />

			<label htmlFor='spectator-link'>
				Spectator <span>to watch</span>
			</label>
			<LinkText href={specLink} />

			<span style={{ color: 'white' }}>
				{/* { spectators currently connected */}
			</span>
		</div>
	);
};

const LinkText = ({ href }) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(href);
	}
	return (
		<div className={cn.actions}>
			<ControlledTextInput id='challenger-link' value={href} readOnly />
			<button onClick={copyToClipboard}>
				<ContentPasteIcon />
			</button>
			<a target='_blank' rel='noopener noreferrer' href={href}>
				<OpenInNewIcon />
			</a>
		</div>
	);
};

export default memo(Links);
