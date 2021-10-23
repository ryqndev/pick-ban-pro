import { useEffect, useCallback, useState, useContext } from 'react';
import {
	doc,
	updateDoc,
	onSnapshot,
	serverTimestamp,
	Timestamp
} from 'firebase/firestore';
import ChampionsContext from '../contexts/ChampionsContext';
import db from '../libs/firestore.js';
import useDraftRenderData from './useDraftRenderData.js';
import { BLUE_SIDE_PICKS, RED_SIDE_PICKS, PICKS, editArrayAtIndex } from '../draftLogicControllerUtil.js';
import useFirestoreTimer from './useFirestoreTimer';

const useFirestoreDraft = (setNav, id, hash, side) => {
	const { draft, setDraft, currentPick, teamRenderData } =
		useDraftRenderData();

	const {championsList} = useContext(ChampionsContext);

	const [data, setData] = useState(null);

	useEffect(() => 
		onSnapshot(doc(db, 'livedrafts', id), doc => {
			setData(doc.data());
		}
	), [id]);

	useEffect(() => {
		if (!data || data.settingUp) return;
		const { position, draft } = data;
		setDraft({ d: draft, p: position });
		setNav({
			type: 'draft',
			side: BLUE_SIDE_PICKS.has(position) ? 'blue' : (RED_SIDE_PICKS.has(position) ? 'red' : ''),
			names: data.details.names,
		});
	}, [data, setDraft, setNav]);

	const forceLockin = useCallback(() => {
        if (data.position >= 20 && data.position !== -1) return false;

        if (!data.draft[data.position]) {
            if (!PICKS.has(data.position)) {

				updateDoc(doc(db, 'livedrafts', id), {
					draft: editArrayAtIndex(data.draft, data.position, 'none'),
					position: data.position + 1,
					timer: Timestamp.now().toMillis() + Number(data.options.timeLimit) * 1000,
					updatedAt: serverTimestamp()

				});
                return true;
            }
            const selected = new Set(data.draft);
            Object.keys(championsList).some(championID => {
                if (!selected.has(championID)) {
					updateDoc(doc(db, 'livedrafts', id), {
						draft: editArrayAtIndex(data.draft, data.position, championID),
						position: data.position + 1,
						timer: Timestamp.now().toMillis() + Number(data.options.timeLimit) * 1000,
						updatedAt: serverTimestamp()
	
					});
                    return true;
                }
                return false;
            });
            return true;
        }

        updateDoc(doc(db, 'livedrafts', id), {
			position: data.position + 1,
			timer: Timestamp.now().toMillis() + Number(data.options.timeLimit) * 1000,
			updatedAt: serverTimestamp(),
		});
        return true;
    }, [championsList, data, id]);


	const {timeLeft}
		= useFirestoreTimer(data?.timer, forceLockin);

	useEffect(() => {
		if(!timeLeft) return;
		setNav({
			type: 'draft',
			side: BLUE_SIDE_PICKS.has(data.position) ? 'blue' : (RED_SIDE_PICKS.has(data.position) ? 'red' : ''),
			names: data.details.names,
			time: timeLeft
		});
		
	}, [timeLeft, data, setNav]);

	const lockin = useCallback(() => {
		// if ready check, update accordingly
		if (data.position === -1 && !data.ready[side === 'blue' ? 0 : 1]) {
			const updatedReadyCheck = [...data.ready];
			updatedReadyCheck[side === 'blue' ? 0 : 1] = true;

			const lastToReady = updatedReadyCheck[side === 'blue' ? 1 : 0];


			updateDoc(doc(db, 'livedrafts', id), {
				ready: updatedReadyCheck,
				position: lastToReady ? 0 : -1,
				timer: lastToReady ? Timestamp.now().toMillis() + Number(data.options.timeLimit) * 1000 : 0,
				updatedAt: serverTimestamp(),
			});
			return true;
		}

		// check if draft is done or opponent not ready
		if (
			(data.position >= 20 || !data.draft[data.position]) &&
			data.position !== -1
		) return false;

		// check if correct side can make pick
		if (currentPick.side !== side) return false;

		updateDoc(doc(db, 'livedrafts', id), {
			position: data.position + 1,
			timer: Timestamp.now().toMillis() + Number(data.options.timeLimit) * 1000,
			updatedAt: serverTimestamp()
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
