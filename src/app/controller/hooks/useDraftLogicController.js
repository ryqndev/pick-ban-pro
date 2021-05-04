import {useState, useCallback, useEffect} from 'react';
import {BLUE_SIDE_PICKS} from '../draftLogicControllerUtil.js';

/**
 * This seems like a pretty good use case for a state machine but I'm not sure I need it
 * The drafting process is linear even with the option of going backwards. Similarly, the ability to 
 * edit a random pick (with the exception of later picks) does not affec the linearity of this process.
 * 
 * Current plan is to just use a standard fixed array and we'll see if further state management is needed
 * 
 */
const useDraftLogicController = () => {
    const [draft, setDraft] = useState(new Array(20).fill(null));
    const [blueTeamRenderData, setBlueTeamRenderData] = useState([]);
    const [redTeamRenderData, setRedTeamRenderData] = useState([]);
    const [currentPick, setCurrentPick] = useState(0);

    useEffect(() => {
        let red = [], blue = [];
        draft.forEach((e, i) => {
            if(BLUE_SIDE_PICKS.has(i)) blue.push(e);
            else                        red.push(e);
        });
        setBlueTeamRenderData(blue);
        setRedTeamRenderData(red);
    }, [draft])

    const select = useCallback((champion) => {
        if(currentPick >= 20) return; // if all champs picked

        setDraft(prevDraft => {
            let updatedDraft = [...prevDraft];
            updatedDraft[currentPick] = champion;
            return updatedDraft;
        });
        setCurrentPick(pick => pick + 1);
    }, [currentPick]);

    return {
        blueTeamRenderData,
        redTeamRenderData,
        currentPick,
        select,
    };
}

export default useDraftLogicController;
