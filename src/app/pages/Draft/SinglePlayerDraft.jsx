import {useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import './Draft.scss';

const Draft = ({setNavRenderData, spectatorConnections, sendToSpectators, message, peer, peerID, send}) => {
    const {draftString} = useParams();
    const {state} = useLocation();

    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        ...draft
    } = useDraftLogicController(draftString);

	const {
        timeLimit,
        timeLeft,
        isRunning,
        // startTimer,
        // endTimer,
    } = useDraftTimer();

    useEffect(() => {
        if(spectatorConnections?.length === 0) return;
        sendToSpectators({
            type: 'STATE_UPDATE',
            content: {
                ready_check: [true, true],
                draft: draft.draft,
                match_name: state.matchName,
                team_names: [state.blueTeamName, state.redTeamName],
                time_limit: state.timeLimit,
                has_time_limits: state.hasTimeLimits,
                timer_end: new Date().getTime() + 60000,
                spectator_link: state.spectatorLink,
            }
        });
    }, [draft.draft, spectatorConnections, sendToSpectators, state]);

    useEffect(() => {
        setNavRenderData({
            type: 'draft',
            side: isRunning ? (localCurrentPick.blue ? 'blue' : 'red') : 'none',
            timeLeft,
            timeLimit,
            match: state.matchName,
            blue: state.blueTeamName,
            red: state.redTeamName,
        });
        return () => setNavRenderData({});
    }, [setNavRenderData, timeLeft, localCurrentPick, isRunning, timeLimit, state]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay {...draft}>
                    <h3>
                        debug
                    </h3>
                    {JSON.stringify({
                        side: localCurrentPick.blue,
                        pick_number: draft.p,
                        id: peerID,
                        connections: peer.connections.length,
                        disconnected: peer.disconnected,
                    }, null, 8)}
                </ChampionSelectionDisplay>
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    ); 
}

export default Draft;
