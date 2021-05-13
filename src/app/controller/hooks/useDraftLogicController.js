import {useState, useCallback, useEffect, useContext} from 'react';
import {PICKS, BLUE_SIDE_PICKS, editArrayAtIndex, parseDraftString, parseCurrentPick} from '../draftLogicControllerUtil.js';
import ChampionsContext from '../contexts/ChampionsContext';

/**
 * This seems like a pretty good use case for a state machine but I'm not sure I need it
 * The drafting process is linear even with the option of going backwards. Similarly, the ability to 
 * edit a random pick (with the exception of later picks) does not affec the linearity of this process.
 * 
 * Current plan is to just use a standard fixed array and we'll see if further state management is needed
 * 
 */
const useDraftLogicController = (draftString='', options={}) => {
    const {championsList} = useContext(ChampionsContext);
    const [draft, setDraft] = useState([]);
    const [currentPick, setCurrentPick] = useState(0);
    const [localCurrentPick, setLocalCurrentPick] = useState({blue: true, index: -1});
    const [blueTeamRenderData, setBlueTeamRenderData] = useState([]);
    const [redTeamRenderData, setRedTeamRenderData] = useState([]);

    useEffect(() => {
        setDraft(parseDraftString(draftString, championsList));
        setCurrentPick(parseCurrentPick(draftString))
    }, [draftString, championsList]);

    useEffect(() => {
        let red = [], blue = [];
        draft.forEach((e, i) => {
            let currentTeam = BLUE_SIDE_PICKS.has(i) ? blue : red;
            if(i === currentPick) setLocalCurrentPick({blue: BLUE_SIDE_PICKS.has(i), index: currentTeam.length});
            currentTeam.push(e);
        });
        setBlueTeamRenderData(blue);
        setRedTeamRenderData(red);
    }, [currentPick, draft])

    const select = useCallback((champion) => {
        if(currentPick >= 20) return;
        setDraft(prevDraft => editArrayAtIndex(prevDraft, currentPick, champion));
    }, [currentPick]);

    const lockin = useCallback(() => {
        if(currentPick >= 20 || !draft[currentPick] || (draft[currentPick] === 'none' && PICKS.has(currentPick))) return;
        if(currentPick >= 19) setLocalCurrentPick({blue: true, index: -1}); // if all champs picked
        setCurrentPick(pick => pick + 1);
    }, [draft, currentPick]);

    const undo = useCallback(() => {
        if(currentPick <= 0) return;
        setDraft(draft => {
            if(currentPick >= 20) return draft;
            let newDraft = [...draft];
            newDraft[currentPick] = null;
            return newDraft;
        });
        setCurrentPick(pick => pick - 1);
    }, [currentPick]);

    return {
        draft,
        blueTeamRenderData,
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        lockin,
        undo,
        select,
    };
}

export default useDraftLogicController;
