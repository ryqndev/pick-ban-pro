import { useCallback, useEffect, useContext } from 'react';
import { editArrayAtIndex, parseDraftString, PICKS } from '../draftLogicControllerUtil.js';
import useDraftRenderData from './useDraftRenderData.js';
import ChampionsContext from '../contexts/ChampionsContext';

/**
 * All action functions (select, lockin, undo) return false if the action was disallowed, true otherwise
 */
const useDraftLogicController = (draftString) => {
    const { championsList } = useContext(ChampionsContext);
    const {
        draft,
        setDraft,
        currentPick,
        teamRenderData,
    } = useDraftRenderData();

    useEffect(() => {
        setDraft(parseDraftString(draftString, championsList));
    }, [draftString, setDraft, championsList]);

    /**
     * @function select selects a champion for current pick
     */
    const select = useCallback(champion => {
        if (draft.p >= 20 || draft.p <= -1) return false;
        setDraft(({ d, p }) => ({ d: editArrayAtIndex(d, draft.p, champion), p }));
        return true;
    }, [draft, setDraft]);

    /**
     * @function lockin locking currently selected pick
     * only increments pick counter on valid cases
     */
    const lockin = useCallback(() => {
        if ((draft.p >= 20 || !draft.d[draft.p]) && draft.p !== -1) return false;
        setDraft(({ d, p }) => ({ d, p: p + 1 }));
        return true;
    }, [draft, setDraft]);

    const forceLockin = useCallback(() => {
        if (draft.p >= 20 && draft.p !== -1) return false;

        if (!draft.d[draft.p]) {
            if (!PICKS.has(draft.p)) {
                setDraft(({ d, p }) => ({ d: editArrayAtIndex(d, draft.p, 'none'), p: p + 1 }));
                return true;
            }
            const selected = new Set(draft.d);
            Object.keys(championsList).some(championID => {
                if (!selected.has(championID)) {
                    setDraft(({ d, p }) => ({ d: editArrayAtIndex(d, draft.p, championID), p: p + 1 }));
                    return true;
                }
                return false;
            });
            return true;
        }

        setDraft(({ d, p }) => ({ d, p: p + 1 }));
        return true;
    }, [championsList, draft, setDraft]);

    /**
     * @function undo undo the last action of draft. 
     * If current pick <= 0, there is no pick to undo
     * If current pick >= 20, undo pick without zeroing out current pick (since its over max)
     * else, zero out draft item and decrement current pick
     */
    const undo = useCallback(() => {
        if (draft.p <= 0) return false;
        if (draft.p >= 20) {
            setDraft(({ d, p }) => ({ d, p: p - 1 }));
            return true;
        }
        setDraft(({ d, p }) => {
            let newDraft = [...d];
            newDraft[p] = null;
            return { d: newDraft, p: p - 1 };
        });
        return true;
    }, [draft.p, setDraft]);

    return {
        draft,
        setDraft,
        currentPick,
        teamRenderData,
        lockin,
        forceLockin,
        undo,
        select,
    };
}

export default useDraftLogicController;
