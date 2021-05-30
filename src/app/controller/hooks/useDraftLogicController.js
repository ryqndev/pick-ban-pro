import {useCallback, useEffect, useContext} from 'react';
import {editArrayAtIndex, parseDraftString} from '../draftLogicControllerUtil.js';
import useDraftRenderData from './useDraftRenderData.js';
import ChampionsContext from '../contexts/ChampionsContext';

const useDraftLogicController = (draftString='') => {
    const {championsList} = useContext(ChampionsContext);
    const {
        draft,
        setDraft,
        currentPick,
        teamRenderData,
    } = useDraftRenderData();

    useEffect(() => {
        setDraft(parseDraftString(draftString));
    }, [draftString, setDraft, championsList]);

    /**
     * @function select selects a champion for current pick
     */
    const select = useCallback(champion => {
        if(draft.p >= 20 || draft.p <= -1) return;
        setDraft(prevDraft => ({d: editArrayAtIndex(prevDraft.d, draft.p, champion), p: prevDraft.p}));
    }, [setDraft, draft.p]);

    /**
     * @function lockin locking currently selected pick
     * only increments pick counter on valid cases
     */
    const lockin = useCallback(() => {
        if((draft.p >= 20 || !draft.d[draft.p]) && draft.p !== -1) return;
        setDraft(({d, p}) => ({d, p: p+1}));
    }, [draft, setDraft]);

    /**
     * @function undo undo the last action of draft. 
     * If current pick <= 0, there is no pick to undo
     * If current pick >= 20, undo pick without zeroing out current pick (since its over max)
     * else, zero out draft item and decrement current pick
     */
    const undo = useCallback(() => {
        if(draft.p <= 0) return;
        if(draft.p >= 20) return setDraft(({d, p}) => ({d, p: p-1}));
        setDraft(({d, p}) => {
            let newDraft = [...d];
            newDraft[p] = null;
            return {d: newDraft, p: p-1};
        });
    }, [setDraft, draft.p]);

    return {
        draft,
        setDraft,
        currentPick,
        teamRenderData,
        lockin,
        undo,
        select,
    };
}

export default useDraftLogicController;
