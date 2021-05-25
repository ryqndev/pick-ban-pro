import {useCallback, useEffect, useContext} from 'react';
import {PICKS, editArrayAtIndex, parseDraftString, parseCurrentPick} from '../draftLogicControllerUtil.js';
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
        localCurrentPick,
        ...teamRenderData
    } = useDraftRenderData();

    useEffect(() => {
        setDraft({d: parseDraftString(draftString, championsList), p: parseCurrentPick(draftString)});
    }, [draftString, setDraft, championsList]);

    const select = useCallback(champion => {
        if(draft.p >= 20) return;
        setDraft(prevDraft => ({d: editArrayAtIndex(prevDraft.d, draft.p, champion), p: prevDraft.p}));
    }, [setDraft, draft.p]);

    const lockin = useCallback(() => {
        if(draft.p >= 20 || !draft.d[draft.p] || (draft.d[draft.p] === 'none' && PICKS.has(draft.p))) return;
        setDraft(({d, p}) => ({d, p: p+1}));
    }, [draft, setDraft]);

    // const selectAndLockRandom = useCallback(() => {
    //     const getRandomChampion = () => {

    //     }
    //     if(currentPick >= 20) return;
    //     // setDraft(prevDraft => editArrayAtIndex(prevDraft, currentPick, champion));
    //     lockin();
    // }, [currentPick, lockin]);

    const undo = useCallback(() => {
        if(draft.p <= 0) return;
        setDraft(draft => {
            if(draft.p >= 20) return draft;
            let newDraft = [...draft];
            newDraft[draft.p] = null;
            return newDraft;
        });
        setDraft(({d, p}) => ({d, p: p-1}));
    }, [setDraft, draft.p]);

    return {
        draft,
        setDraft,
        localCurrentPick,
        lockin,
        undo,
        select,
        ...teamRenderData,
    };
}

export default useDraftLogicController;
