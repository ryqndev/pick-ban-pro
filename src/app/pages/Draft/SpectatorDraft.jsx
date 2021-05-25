import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
// import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData'
import './Draft.scss';

const SpectatorDraft = ({peer, peerID, connect, message}) => {
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
        if(!message) return;
        if(message?.type === 'STATE_UPDATE'){
            setDraft(message.content?.draft);
            setReadyCheck(message.content?.ready_check);
        }
    }, [message, setDraft]);

    if(!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay draft={draft} spectator={true}>
                    <br />
                    <br />
                    <h3>
                        debug
                    </h3>
                    {JSON.stringify({
                        side: localCurrentPick.blue,
                        pick_number: draft.p,
                        id: peerID,
                        // connections: peer.connections,
                        disconnected: peer.disconnected,
                    }, null, 8)}
                </ChampionSelectionDisplay>
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    );
}

export default SpectatorDraft;
