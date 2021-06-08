import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData';

const useDraftClient = ({ type, setNavigationContent, peerID, connect, message }) => {
    const { id } = useParams();
    const { draft, setDraft, currentPick, teamRenderData } = useDraftRenderData();
    const [readyCheck, setReadyCheck] = useState(null);
    const [isBlue, setIsBlue] = useState(false);
    const [names, setNames] = useState({ match: '', blue: '', red: '' });

    const {
        on,
        time,
        end,
        limit,
        setLimit,
        setEnd,
        setOn,
    } = useDraftTimer();

    const updateState = useCallback((message) => {
        setOn(message.content.on);
        setEnd(message.content.end);
        setLimit(message.content.limit);
        setDraft(message.content.draft);
        setReadyCheck(message.content.ready_check);
        setNames(message.content.names);
        setIsBlue(!message.content.hostIsBlue);
    }, [setDraft, setEnd, setLimit, setOn]);

    /** connect to host as :type  */
    useEffect(() => {
        if (peerID) connect(id, type);
    }, [connect, peerID, type, id]);

    useEffect(() => {
        if (!message) return;
        if (message?.type === 'STATE_UPDATE') updateState(message);

    }, [message, updateState]);

    useEffect(() => {
        setNavigationContent({ type: 'draft', limit, time, end, names, side: currentPick.side });
        return () => setNavigationContent({});
    }, [time, end, limit, currentPick, names, setNavigationContent]);

    return {
        isBlue,
        readyCheck,
        settings: {
            limit,
            on,
            id,
        },
        draft: {
            ...teamRenderData,
            ...draft,
            currentPick,
        }
    }
}

export default useDraftClient;
