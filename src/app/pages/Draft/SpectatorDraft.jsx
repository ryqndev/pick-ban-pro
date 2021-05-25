import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
// import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData'
import './Draft.scss';

const SpectatorDraft = ({peerID, connect, message, setNavRenderData}) => {
    const {id} = useParams();
    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        setDraft,
        draft,
    } = useDraftRenderData();
    const [readyCheck, setReadyCheck] = useState(null);

	// const {
    //     timeLimit,
    //     timeLeft,
    //     isRunning,
    //     startTimer,
    //     endTimer,
    // } = useDraftTimer();

    useEffect(() => {
        if(!peerID) return;
        connect(id, 'spectator');
    }, [connect, peerID, id]);

    useEffect(() => {
        if(!message || !message?.content) return;
        setDraft(message.content?.draft);
        setReadyCheck(message.content?.ready_check);
        setNavRenderData({
            type: 'draft',
            timeLimit: message.content?.time_limit,
            match: message.content?.match_name,
            blue: message.content?.team_names[0],
            red: message.content?.team_names[1],
        });
        return () => setNavRenderData({});
    }, [message, setDraft, setNavRenderData]);

    if(!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay draft={draft} spectator>
                    <br />
                    <br />
                    <h3>
                        debug
                    </h3>
                    {JSON.stringify({
                        side: localCurrentPick.blue,
                        pick_number: draft.p,
                        id: peerID,
                    }, null, 8)}
                </ChampionSelectionDisplay>
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    );
}

export default SpectatorDraft;
