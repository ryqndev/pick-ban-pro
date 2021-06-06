import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useNames from './useNames.js';
import useDraftLogicController from './useDraftLogicController.js';
import useDraftTimer from './useDraftTimer.js';

const useDraftHost = (setNavigationContent, spectators, update, draftString) => {
    const { state } = useLocation();
    const names = useNames(state?.names);

    const { teamRenderData, currentPick, lockin, undo, ...draft } = useDraftLogicController(draftString);

    const onEnd = () => draft.forceLockin() && startTimer();
    const lockinWithTimer = () => lockin() && startTimer();
    const undoWithTimer = () => undo() && startTimer();

    const { on, setOn, setLimit, limit, time, end, startTimer } = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, onEnd);

    useEffect(() => {
        update({
            type: 'STATE_UPDATE', content: {
                ready_check: true, draft: draft.draft, limit, on, end, names
            }
        });
    }, [draft.draft, spectators, end, update, names, on, limit]);

    useEffect(() => {
        setNavigationContent({ type: 'draft', side: currentPick.side, end, time, limit, names });
        return () => setNavigationContent({});
    }, [setNavigationContent, time, end, limit, names, currentPick]);

    return {
        timer: {
            on, setOn, setLimit, limit,
        },
        lockin: lockinWithTimer,
        undo: undoWithTimer,
        teamRenderData,
        currentPick,
        ...draft,
    }
}

export default useDraftHost;
