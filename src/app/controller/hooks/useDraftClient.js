import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData';
import { confirmTimerToggleRequest, confirmUndoRequest } from '../libs/sweetalert';

const useDraftClient = ({ type, setNavigationContent, peerID, connect, send, message }) => {
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

    const undoRequest = useCallback((message) => {
        confirmUndoRequest(() => {
            send({type: 'CONFIRM_UNDO'});
        });
    }, [send]);

    const timerRequest = useCallback((message) => {
        confirmTimerToggleRequest(message.content, () => {
            send({type: 'CONFIRM_TIMER_TOGGLE_REQUEST', content: message.content});
        });
    }, [send]);

    /** connect to host as :type  */
    useEffect(() => {
        if (peerID) connect(id, type);
    }, [connect, peerID, type, id]);

    useEffect(() => {
        if (!message && !message?.type) return;
        if (message.type === 'STATE_UPDATE') updateState(message);
        if (message.type === 'UNDO') undoRequest(message);
        if (message.type === 'TIMER_TOGGLE_REQUEST') timerRequest(message);

    }, [message, undoRequest, timerRequest, updateState]);

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
