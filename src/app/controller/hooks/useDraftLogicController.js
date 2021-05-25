import {useState, useCallback, useEffect, useContext} from 'react';
import {PICKS, BLUE_SIDE_PICKS, editArrayAtIndex, parseDraftString, parseCurrentPick} from '../draftLogicControllerUtil.js';
import useDraftRenderData from './useDraftRenderData.js';
import ChampionsContext from '../contexts/ChampionsContext';

/**
 * This seems like a pretty good use case for a state machine but I'm not sure I need it
 * The drafting process is linear even with the option of going backwards. Similarly, the ability to 
 * edit a random pick (with the exception of later picks) does not affect the linearity of this process.
 * 
 * Current plan is to just use a standard fixed array and we'll see if further state management is needed
 * 
 */
const useDraftLogicController = (draftString='') => {
    const {championsList} = useContext(ChampionsContext);
    const {
        draft,
        setDraft,
        currentPick,
        setCurrentPick,
        localCurrentPick,
        ...teamRenderData
    } = useDraftRenderData();

    useEffect(() => {
        setDraft(parseDraftString(draftString, championsList));
        setCurrentPick(parseCurrentPick(draftString))
    }, [draftString, setDraft, setCurrentPick, championsList]);

    const select = useCallback(champion => {
        if(currentPick >= 20) return;
        setDraft(prevDraft => editArrayAtIndex(prevDraft, currentPick, champion));
    }, [setDraft, currentPick]);

    const lockin = useCallback(() => {
        if(currentPick >= 20 || !draft[currentPick] || (draft[currentPick] === 'none' && PICKS.has(currentPick))) return;
        setCurrentPick(pick => pick + 1);
    }, [draft, setCurrentPick, currentPick]);

    const selectAndLockRandom = useCallback(() => {
        const getRandomChampion = () => {

        }
        if(currentPick >= 20) return;
        // setDraft(prevDraft => editArrayAtIndex(prevDraft, currentPick, champion));
        lockin();
    }, [currentPick, lockin]);

    const undo = useCallback(() => {
        if(currentPick <= 0) return;
        setDraft(draft => {
            if(currentPick >= 20) return draft;
            let newDraft = [...draft];
            newDraft[currentPick] = null;
            return newDraft;
        });
        setCurrentPick(pick => pick - 1);
    }, [setDraft, setCurrentPick, currentPick]);

    return {
        draft,
        setDraft,
        localCurrentPick,
        currentPick,
        setCurrentPick,
        lockin,
        undo,
        select,
        ...teamRenderData,
    };
}

export default useDraftLogicController;
