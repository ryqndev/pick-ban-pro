import { useEffect, useCallback, useState, useContext } from 'react';
import {
	doc,
	updateDoc,
	onSnapshot,
	serverTimestamp,
	Timestamp,
} from 'firebase/firestore';
import ChampionsContext from '../contexts/ChampionsContext';
import db from '../libs/firestore.js';
import useDraftRenderData from './useDraftRenderData.js';
import {
	BLUE_SIDE_PICKS,
	RED_SIDE_PICKS,
	PICKS,
	editArrayAtIndex,
} from '../draftLogicControllerUtil.js';
import useFirestoreTimer from './useFirestoreTimer';

const useFirestoreDraft = (setNav, id, hash, side) => {
	const { draft, setDraft, currentPick, teamRenderData } =
		useDraftRenderData();
	const { championsList } = useContext(ChampionsContext);
	const [data, setData] = useState(null);

	useEffect(
		() =>
			onSnapshot(doc(db, 'livedrafts', id), doc => {
				setData(doc.data());
			}),
		[id]
	);

	const forceLockin = useCallback(() => {
		const { position, options, draft } = data;
		if (position >= 20 && position < 0) return false;

		const getRandomChamp = () => {
			const picked = new Set(data.draft);
			return Object.keys(championsList).find(
				champ => !picked.has(champ)
			);
		};
		updateDoc(doc(db, 'livedrafts', id), {
			...(!draft[position] && ({
				draft: editArrayAtIndex(
					draft,
					position,
					!PICKS.has(data.position) ? 'none' : getRandomChamp()
				),
			})),
			position: position + 1,
			timer: position < 19
				? Timestamp.now().toMillis() + options.timeLimit * 1000
				: 0,
			updatedAt: serverTimestamp(),
		});
		return true;
	}, [championsList, data, id]);

	const { timeLeft } = useFirestoreTimer(data?.timer, forceLockin);

	useEffect(() => {
		if (!data || data.settingUp) return;
		const { position, draft } = data;
		setDraft({ d: draft, p: position });
		setNav({
			type: 'draft',
			side: BLUE_SIDE_PICKS.has(position)
				? 'blue'
				: RED_SIDE_PICKS.has(position)
					? 'red'
					: '',
			names: data.details.names,
			time: timeLeft,
			limit: data.options.timeLimit,
			end: !timeLeft ? 0 : true,
		});
	}, [data, timeLeft, setDraft, setNav]);

	const lockin = useCallback(() => {
		// if ready check, update accordingly
		if (data.position === -1 && !data.ready[side === 'blue' ? 0 : 1]) {
			const updatedReadyCheck = [...data.ready];
			updatedReadyCheck[side === 'blue' ? 0 : 1] = true;

			const lastToReady = updatedReadyCheck[side === 'blue' ? 1 : 0];

			updateDoc(doc(db, 'livedrafts', id), {
				ready: updatedReadyCheck,
				position: lastToReady ? 0 : -1,
				timer: lastToReady
					? Timestamp.now().toMillis() +
					Number(data.options.timeLimit) * 1000
					: 0,
				updatedAt: serverTimestamp(),
			});
			return true;
		}

		// check if draft is done or opponent not ready
		if (
			(data.position >= 20 || !data.draft[data.position]) &&
			data.position !== -1
		)
			return false;

		// check if correct side can make pick
		if (currentPick.side !== side) return false;

		updateDoc(doc(db, 'livedrafts', id), {
			position: data.position + 1,
			timer:
				data.position + 1 < 20
					? Timestamp.now().toMillis() +
					Number(data.options.timeLimit) * 1000
					: 0,
			updatedAt: serverTimestamp(),
		});
	}, [data, id, side, currentPick]);

	const select = champion => {
		if (currentPick.side !== side) return false;
		const updatedDraft = [...data.draft];
		updatedDraft[data.position] = champion;
		updateDoc(doc(db, 'livedrafts', id), {
			draft: updatedDraft,
			updatedAt: serverTimestamp(),
		});
	};

	return {
		render: teamRenderData,
		actions: {
			lockin,
			select,
		},
		data,
		draft,
		currentPick,
	};
};

export default useFirestoreDraft;
