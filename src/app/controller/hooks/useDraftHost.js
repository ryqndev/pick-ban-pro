import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useNames from './useNames.js';
import useDraftLogicController from './useDraftLogicController.js';
import useDraftTimer from './useDraftTimer.js';

const useDraftHost = (setNavigationContent, spectators, update, draftString) => {
    const { state } = useLocation();
    const names = useNames(state?.names);
    const { teamRenderData, currentPick, draft, forceLockin, ...actions } = useDraftLogicController(draftString);

    const [isBlue, setIsBlue] = useState(state?.isBlue ?? true);

    const { on, setOn, setLimit, limit, time, end, startTimer } = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, forceLockin);

    useEffect(() => {
        if(draft.p < 20 && draft.p >= 0) startTimer();
    }, [draft.p, startTimer]);

    useEffect(() => {
        update({
            type: 'STATE_UPDATE', content: {
                ready_check: true, draft, limit, on, end, names, hostIsBlue: isBlue,
            }
        });
    }, [draft, spectators, end, update, names, on, limit, isBlue]);

    useEffect(() => {
        setNavigationContent({ type: 'draft', side: currentPick.side, end, time, limit, names });
        return () => setNavigationContent({});
    }, [setNavigationContent, time, end, limit, names, currentPick]);

    return {
        isBlue,
        settings: {
            on, 
            limit,
            setOn, 
            setLimit,
            setIsBlue,
        },
        actions,
        draft: {
            ...teamRenderData,
            ...draft,
            currentPick,
        }
    }
}

export default useDraftHost;
