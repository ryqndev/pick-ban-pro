import { useEffect, useCallback, useState } from 'react';
import {
	doc,
	updateDoc,
	onSnapshot,
	serverTimestamp,
} from 'firebase/firestore';
import db from '../libs/firestore.js';
import useDraftRenderData from './useDraftRenderData.js';
import useDraftTimer from './useDraftTimer.js';
import { BLUE_SIDE_PICKS } from '../draftLogicControllerUtil.js';

const useFirestoreDraft = (setNavigationContent, id, hash, side) => {
	const { draft, setDraft, currentPick, teamRenderData } =
		useDraftRenderData();

	const [data, setData] = useState(null);

	useEffect(
		() =>
			onSnapshot(doc(db, 'livedrafts', id), doc => {
				setData(doc.data());
			}),
		[id]
	);

	useEffect(() => {
		if (!data || data.settingUp) return;
		const { position, draft } = data;
		setDraft({ d: draft, p: position });
		setNavigationContent({
			type: 'draft',
			side: BLUE_SIDE_PICKS.has(position) ? 'blue' : 'red',
			names: data.details.names,
		});
	}, [data, setDraft, setNavigationContent]);

	const lockin = useCallback(() => {
		// if ready check, update accordingly
		if (data.position === -1 && !data.ready[side === 'blue' ? 0 : 1]) {
			const updatedReadyCheck = data.ready;
			updatedReadyCheck[side === 'blue' ? 0 : 1] = true;

			updateDoc(doc(db, 'livedrafts', id), {
				ready: updatedReadyCheck,
				position: data.ready[side === 'blue' ? 1 : 0] ? 0 : -1,
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
		});
	}, [data, id, side, currentPick]);

	const select = champion => {
		if (currentPick.side !== side) return false;
		const updatedDraft = [...data.draft];
		updatedDraft[data.position] = champion;
		updateDoc(doc(db, 'livedrafts', id), {
			draft: updatedDraft,
		});
	};

	// const { on, setOn, setLimit, limit, time, end, startTimer }
	//     = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, forceLockin);

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
