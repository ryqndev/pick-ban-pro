import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../controller/libs/firestore.js';
import { doc, onSnapshot } from "firebase/firestore";
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData';

const useDraftClient = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { setDraft, setCurrentPick, teamRenderData } = useDraftRenderData();

    useEffect(() => onSnapshot(doc(db, "livedrafts", id), doc => {
        setData(doc.data());
    }), [id]);

    useEffect(() => {
        if(data?.settingUp ?? true) return;
        console.log('updated data:', data);
        setDraft({d: data.draft, p: data?.position})
    }, [data, setDraft]);

    // const {
    //     on,
    //     time,
    //     end,
    //     limit,
    // } = useDraftTimer();

    return {
        render: { ...teamRenderData },
        ...data,
    }
}

export default useDraftClient;
