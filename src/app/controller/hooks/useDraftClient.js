import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData';

const useDraftClient = (type, setNavigationContent, peerID, connect, message) => {
    const { id } = useParams();
    const { draft, setDraft, currentPick, teamRenderData } = useDraftRenderData();
    const [readyCheck, setReadyCheck] = useState(null);

    const {
        time,
        end,
        setEnd,
        setOn,
    } = useDraftTimer();

    /** connect to host as :type  */
    useEffect(() => {
        if (peerID) connect(id, type);
    }, [connect, peerID, type, id]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setEnd(message.content?.end);
        setDraft(message.content?.draft);
        setReadyCheck(message.content?.ready_check);
        setOn(message.content?.on);
    }, [message, setDraft, setEnd, setOn, currentPick, setNavigationContent]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setNavigationContent({
            type: 'draft',
            limit: message.content?.limit,
            time,
            end,
            names: message.content?.names,
            side: currentPick.side,
        });
        return () => setNavigationContent({});
    }, [time, end, message, currentPick, setNavigationContent]);

    return {
        teamRenderData,
        draft,
        currentPick,
        readyCheck,
    }
}

export default useDraftClient;
