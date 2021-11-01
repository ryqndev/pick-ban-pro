import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useNames from './useNames.js';
import useDraftLogicController from './useDraftLogicController.js';
import useDraftTimer from './useDraftTimer.js';
import {BLUE_SIDE_PICKS} from '../draftLogicControllerUtil.js';

const useDraftHost = (setNav, spectators, update, multiplayer, draftString) => {
    const { state } = useLocation();
    const [isBlue, setIsBlue] = useState(state?.isBlue ?? true);
    const [readyCheck, setReadyCheck] = useState(() => [false, false]);

    const names 
        = useNames(state?.names);

    const { teamRenderData, currentPick, draft, forceLockin, ...actions } 
        = useDraftLogicController(draftString);

    const { on, setOn, setLimit, limit, time, end, startTimer } 
        = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, forceLockin);

    const enemyTurnToMove = useCallback(() => {
        const blueTeamToMove = BLUE_SIDE_PICKS.has(draft.p);
        return isBlue ? !blueTeamToMove : blueTeamToMove;
    }, [draft.p, isBlue]);

    const lockin = (caller) => {
        if(draft.p === -1 || !multiplayer) return actions.lockin();
        if(caller === 'HOST' && !enemyTurnToMove()) return actions.lockin();
        if(caller === 'CLIENT' && enemyTurnToMove()) return actions.lockin();
    }

    const select = (champion, caller='HOST') => {
        if (!multiplayer) actions.select(champion);
        if(caller === 'HOST' && !enemyTurnToMove()) actions.select(champion);
        if(caller === 'CLIENT' && enemyTurnToMove()) actions.select(champion);
    }

    useEffect(() => {
        if(draft.p < 20 && draft.p >= 0) startTimer();
    }, [draft.p, startTimer]);

    useEffect(() => {
        update({
            type: 'STATE_UPDATE', content: {
                ready_check: readyCheck, draft, limit, on, end, names, hostIsBlue: isBlue,
            }
        });
    }, [draft, spectators, end, update, names, readyCheck, on, limit, isBlue]);

    useEffect(() => {
        setNav({ type: 'draft', side: currentPick.side, end, time, limit, names });
        return () => setNav({});
    }, [setNav, time, end, limit, names, currentPick]);

    return {
        isBlue,
        readyCheck,
        setReadyCheck,
        settings: {
            options: {
                hasTimeLimits: on,
                timeLimit: limit,
                toggleTimeLimit: setOn, 
                setTimeLimit: setLimit,
                setIsBlue,
            },

        },
        actions: {
            lockin,
            select,
            undo: actions.undo,
            enemy: {
                lockin,
                select,
            },
        },
        draft: {
            ...teamRenderData,
            ...draft,
            currentPick,
        }
    }
}

export default useDraftHost;
