import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import useDraftLogicController from './useDraftLogicController.js';
import useDraftTimer from './useDraftTimer.js';
import {BLUE_SIDE_PICKS} from '../draftLogicControllerUtil.js';

const useFirestoreDraft = (setNavigationContent, spectators, update, multiplayer, draftString) => {

    const { teamRenderData, currentPick, draft, forceLockin, ...actions } 
        = useDraftLogicController(draftString);

    // const { on, setOn, setLimit, limit, time, end, startTimer } 
    //     = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, forceLockin);

    return {
        draft: {
            ...teamRenderData,
            ...draft,
            currentPick,
        }
    }
}

export default useFirestoreDraft;
