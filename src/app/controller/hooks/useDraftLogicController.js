import {useState} from 'react';

/**
 * This seems like a pretty good use case for a state machine but I'm not sure I need it
 * The drafting process is linear even with the option of going backwards. Similarly, the ability to 
 * edit a random pick (with the exception of later picks) does not affec the linearity of this process.
 * 
 * Current plan is to just use a standard fixed array and we'll see if further state management is needed
 * 
 */
const useDraftLogicController = () => {

    const [draft, setDraft] = useState([]);
    let blueTeamRenderData;
    let redTeamRenderData;

    return {
        BlueTeamRenderData: blueTeamRenderData,
        RedTeamRenderData: redTeamRenderData,
    };
}

export default useDraftLogicController;
