import { useState, useEffect } from 'react';
import { updateDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import db from '../../controller/libs/firestore';
import Toggle from 'react-toggle';
import ControlledTextInput from '../../components/ControlledTextInput';
import { Links } from '../../components/PeerDisplays';
import './Create.sass';

const Create = ({ challenge }) => {
	const [[roomid, bluehash, redhash]] = useState(() => [
		generate(6),
		generate(4),
		generate(4),
	]);
	const [matchName, setMatchName] = useState('');
	const [blueTeamName, setBlueTeamName] = useState('');
	const [redTeamName, setRedTeamName] = useState('');

	const [hasTimeLimits, setHasTimeLimits] = useState(!!challenge);
	const [timeLimit, setTimeLimit] = useState(30);

	const [areOptionsFinalized, setAreOptionsFinalized] = useState(false);

	function generate(length = 10) {
		return (Math.random() + 1).toString(36).substring(2, length + 2);
	}
	useEffect(() => {
		setDoc(doc(db, 'livedrafts', roomid), {
			blue: bluehash,
			red: redhash,
			settingUp: true,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		});
	}, [roomid, bluehash, redhash]);

	const handleSubmit = event => {
		event.preventDefault();
		setAreOptionsFinalized(true);
		updateDoc(doc(db, 'livedrafts', roomid), {
			draft: new Array(20).fill(0),
			position: -1,
			settingUp: false,
			options: {},
			details: {
				patch: '11.19',
				names: {
					blue: blueTeamName,
					red: redTeamName,
					match: matchName,
				},
			},
			updatedAt: serverTimestamp(),
		}).catch(err => {
			console.error(err);
			setAreOptionsFinalized(false);
		});
	};

	return (
		<div className='create--wrapper'>
			<form className='content card__component' onSubmit={handleSubmit}>
				<h1>Options</h1>
				<span>
					{areOptionsFinalized
						? 'Options are set. Use the links to draft'
						: 'You must finalize options before drafting'}
				</span>
				<div>
					<NameInput
						disabled={areOptionsFinalized}
						name='Match'
						example='Worlds 2021'
						value={matchName}
						setValue={setMatchName}
					/>
					<NameInput
						disabled={areOptionsFinalized}
						name='Blue'
						example='Cloud9'
						value={blueTeamName}
						setValue={setBlueTeamName}
					/>
					<NameInput
						disabled={areOptionsFinalized}
						name='Red'
						example='Damwon Gaming'
						value={redTeamName}
						setValue={setRedTeamName}
					/>

					<div className='time-limits'>
						<label htmlFor='timer'>Set Time Limits:</label>
						<Toggle
							id='timer'
							icons={false}
							className='timer-toggle'
							checked={hasTimeLimits}
							onChange={() => {
								!areOptionsFinalized &&
									setHasTimeLimits(prev => !prev);
							}}
						/>
						{hasTimeLimits && (
							<>
								<label className='seconds' htmlFor='timer'>
									Seconds per pick:
								</label>
								<ControlledTextInput
									disabled={areOptionsFinalized}
									id='time-limit'
									value={timeLimit}
									setValue={setTimeLimit}
								/>
							</>
						)}
					</div>
				</div>
				<button disabled={areOptionsFinalized}>
					{areOptionsFinalized
						? 'Match is ready!'
						: 'Finalize Options'}
				</button>
			</form>
			<div className='link-holder card__component'>
				<Links roomid={roomid} blue={bluehash} red={redhash} />
			</div>
		</div>
	);
};

const NameInput = ({ name, value, setValue, example, disabled }) => {
	return (
		<>
			<label htmlFor={`${name}-team-name`}>
				{name === 'Match' ? name : name + ' Team'} Name:{' '}
				<span>(optional)</span>
			</label>
			<ControlledTextInput
				disabled={disabled}
				id={`${name}-team-name`}
				placeholder={'Ex. ' + example}
				value={value}
				setValue={setValue}
			/>
		</>
	);
};

export default Create;
