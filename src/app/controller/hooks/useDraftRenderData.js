import {useState, useEffect,} from 'react';
import {BLUE_SIDE_PICKS} from '../draftLogicControllerUtil.js';

const useDraftLogicController = () => {
    const [draft, setDraft] = useState({d: new Array(20).fill(null), p: 0});
    const [localCurrentPick, setLocalCurrentPick] = useState({blue: true, index: -1});
    const [blueTeamRenderData, setBlueTeamRenderData] = useState([]);
    const [redTeamRenderData, setRedTeamRenderData] = useState([]);

    useEffect(() => {
        let red = [], blue = [];
        draft.d.forEach((e, i) => {
            let currentTeam = BLUE_SIDE_PICKS.has(i) ? blue : red;
            if(i === draft.p) setLocalCurrentPick({blue: BLUE_SIDE_PICKS.has(i), index: currentTeam.length});
            currentTeam.push(e);
        });
        if(draft.p >= 18) setLocalCurrentPick({blue: true, index: -1}); // if all champs picked
        setBlueTeamRenderData(blue);
        setRedTeamRenderData(red);
    }, [draft]);

    return {
        draft,
        setDraft,
        blueTeamRenderData,
        redTeamRenderData,
        localCurrentPick,
    };
}

export default useDraftLogicController;
