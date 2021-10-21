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
						<label htmlFor={cn['blue-link']} className={cn.blue}>
							Blue Side <span> (has first pick) </span>
						</label>
					</div>
					<LinkText href={blueLink} id={cn['blue-link']} />

					<label htmlFor={cn['red-link']} className={cn.red}>
						Red Side <span> (has last pick) </span>
					</label>
					<LinkText href={redLink} id={cn['red-link']} />
				</>
			)}

			<div className={cn.hr}></div>

			<label htmlFor={cn['spectator-link']}>
				Spectator <span>to watch</span>
			</label>
			<LinkText href={specLink} id={cn['spectator-link']} />
			{blue && red && (
				<button
					style={{
						padding: '0',
						width: '120px',
						margin: '10px auto 5px',
						height: '40px',
						fontSize: '0.8em',
					}}
					onClick={() => {
						navigator.clipboard.writeText(
							`Blue Team: ${blueLink}\nRed Team: ${redLink}\nSpectators: ${specLink}`
						);
					}}
				>
					Copy All
				</button>
			)}
		</div>
	);
};

const LinkText = ({ href, id }) => {
	const copyToClipboard = () => {
		navigator.clipboard.writeText(href);
	};
	return (
		<div className={cn.actions}>
			<ControlledTextInput id={id} value={href} readOnly />
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
