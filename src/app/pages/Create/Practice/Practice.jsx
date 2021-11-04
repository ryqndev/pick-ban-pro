import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../../components/ControlledTextInput';
import LabelledToggle from '../../../components/LabelledToggle/LabelledToggle';
import { Links } from '../../../components/PeerDisplays';
import cn from '../Challenge/Challenge.module.sass';
import clsx from 'clsx';

const Practice = ({ peerID, connection, challenge, spectators }) => {
	const navigate = useNavigate();

	const [matchName, setMatchName] = useState('');
	const [blueTeamName, setBlueTeamName] = useState('');
	const [redTeamName, setRedTeamName] = useState('');

	const [isBlue, setIsBlue] = useState(true);

	const [hasTimeLimits, setHasTimeLimits] = useState(!!challenge);
	const [timeLimit, setTimeLimit] = useState(30);

	const [draftLink, setDraftLink] = useState('/d');

	useEffect(() => {
		if (matchName.length !== 0)
			return setDraftLink(
				`/d/${encodeURIComponent(matchName)}/${encodeURIComponent(
					blueTeamName
				)},${encodeURIComponent(redTeamName)}/`
			);

		if (redTeamName.length + blueTeamName.length === 0)
			return setDraftLink(`/d/`);

		return setDraftLink(
			`/draft/${encodeURIComponent(blueTeamName)},${encodeURIComponent(
				redTeamName
			)}/`
		);
	}, [matchName, blueTeamName, redTeamName]);

	const handleSubmit = event => {
		event.preventDefault();
		navigate(challenge ? '/challenge/' + peerID : draftLink, {
			state: {
				names: {
					match: matchName,
					blue: blueTeamName,
					red: redTeamName,
				},
				hasTimeLimits,
				timeLimit,
				isBlue,
			},
		});
	};

	return (
		<div className={cn.container}>
			<form className={clsx(cn.content, 'card__component')} onSubmit={handleSubmit}>
				<h1>Options</h1>
				<span>(You can change these during draft)</span>
				<div>
					<label htmlFor='match-name'>
						Match Name: <span>(optional)</span>
					</label>
					<ControlledTextInput
						id='match-name'
						placeholder='Ex. MSI 2021'
						value={matchName}
						setValue={setMatchName}
					/>

					<label htmlFor='blue-team-name'>
						Blue Team Name: <span>(optional)</span>
					</label>
					<ControlledTextInput
						id='blue-team-name'
						placeholder='Ex. Cloud9'
						value={blueTeamName}
						setValue={setBlueTeamName}
					/>

					<label htmlFor='red-team-name'>
						Red Team Name: <span>(optional)</span>
					</label>
					<ControlledTextInput
						id='red-team-name'
						placeholder='Ex. DWG KIA'
						value={redTeamName}
						setValue={setRedTeamName}
					/>

					<div className={cn['time-limits']}>
						<label htmlFor='timer'>Set Time Limits:</label>
						<Toggle
							id='timer'
							icons={false}
							className='timer-toggle'
							checked={hasTimeLimits}
							onChange={() => {
								setHasTimeLimits(prev => !prev);
							}}
						/>
						{hasTimeLimits && (
							<>
								<label className={cn.seconds} htmlFor='timer'>
									Seconds per pick:
								</label>
								<ControlledTextInput
									id='time-limit'
									value={timeLimit}
									setValue={setTimeLimit}
								/>
							</>
						)}
					</div>
				</div>
				<button>Start</button>
			</form>
			<div className={clsx(cn['link-holder'], 'card__component')}>
				<Links
					spectators={spectators}
					peerID={peerID}
					connection={challenge ? connection : null}
					challenge={challenge}
				/>
                <br />
                <br />
			</div>
		</div>
	);
};

export default Practice;
