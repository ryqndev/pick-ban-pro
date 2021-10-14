import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import db from '../libs/firestore.js';
import useDraftRenderData from './useDraftRenderData.js';
import useDraftTimer from './useDraftTimer.js';

const useFirestoreDraft = (setNavigationContent, id, hash) => {
    const {
        draft,
        setDraft,
        currentPick,
        teamRenderData,
    } = useDraftRenderData();

    const [data, setData] = useState(null);

    useEffect(() => onSnapshot(doc(db, 'livedrafts', id), doc => {
        setData(doc.data());
    }), [id]);

    useEffect(() => {
        console.log("udpate in data", data);
        if (!data || data.settingUp) return;
        const { position, draft } = data;
        setDraft({ d: draft, p: position });
    }, [data, setDraft]);


    // const { on, setOn, setLimit, limit, time, end, startTimer } 
    //     = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, forceLockin);

    return {
        render: teamRenderData,
        data,
        draft,
        currentPick,
    }
}

export default useFirestoreDraft;
