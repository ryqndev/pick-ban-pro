import { useState, useEffect, } from 'react';
import { BLUE_SIDE_PICKS } from '../draftLogicControllerUtil.js';

const useDraftLogicController = () => {
    const [draft, setDraft] = useState({ d: new Array(20).fill(null), p: -1 });
    const [currentPick, setCurrentPick] = useState({ side: 'none', index: -1 });
    const [blueTeamRenderData, setBlueTeamRenderData] = useState([]);
    const [redTeamRenderData, setRedTeamRenderData] = useState([]);

    useEffect(() => {
        let red = [], blue = [];
        draft.d.forEach((e, i) => {
            let currentTeam = BLUE_SIDE_PICKS.has(i) ? blue : red;
            if (i === draft.p) setCurrentPick({ side: BLUE_SIDE_PICKS.has(i) ? 'blue' : 'red', index: currentTeam.length });
            currentTeam.push(e);
        });
        
        if (draft.p >= 20) setCurrentPick({ side: 'none', index: -2 }); // if all champs picked
        if (draft.p <= -1) setCurrentPick({ side: 'none', index: -1 }); // if all champs picked

        setBlueTeamRenderData(blue);
        setRedTeamRenderData(red);
    }, [draft]);

    return {
        draft,
        setDraft,
        currentPick,
        teamRenderData: {
            blue: blueTeamRenderData,
            red: redTeamRenderData,
        },
    };
}

export default useDraftLogicController;
