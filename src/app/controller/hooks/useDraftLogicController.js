import {useState, useCallback, useEffect} from 'react';
import {PICKS, BLUE_SIDE_PICKS, editArrayAtIndex, LPL_SPRING_2021_FINALS_GAME_1} from '../draftLogicControllerUtil.js';

/**
 * This seems like a pretty good use case for a state machine but I'm not sure I need it
 * The drafting process is linear even with the option of going backwards. Similarly, the ability to 
 * edit a random pick (with the exception of later picks) does not affec the linearity of this process.
 * 
 * Current plan is to just use a standard fixed array and we'll see if further state management is needed
 * 
 */
const useDraftLogicController = () => {
    // const [draft, setDraft] = useState(LPL_SPRING_2021_FINALS_GAME_1);
    // const [currentPick, setCurrentPick] = useState(20);
    // const [localCurrentPick, setLocalCurrentPick] = useState({blue: true, index: -1});
    const [draft, setDraft] = useState(new Array(20).fill(null));
    const [currentPick, setCurrentPick] = useState(0);
    const [localCurrentPick, setLocalCurrentPick] = useState({blue: true, index: 0});
    const [blueTeamRenderData, setBlueTeamRenderData] = useState([]);
    const [redTeamRenderData, setRedTeamRenderData] = useState([]);

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

    return {
        draft,
        blueTeamRenderData,
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        lockin,
        select,
    };
}

export default useDraftLogicController;
