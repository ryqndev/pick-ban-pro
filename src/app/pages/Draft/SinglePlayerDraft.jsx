import {useEffect, memo} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useNames from '../../controller/hooks/useNames';
import './Draft.scss';

const SinglePlayerDraft = ({setNavigationContent, spectatorConnections, sendToSpectators, peer, peerID, send}) => {
    const {state} = useLocation();
    const {draftString} = useParams();
    const {teamRenderData, currentPick, ...draft} = useDraftLogicController(draftString);
    const names = useNames(state?.names);

	const {
        timeLimit,
        timeLeft,
        isRunning,
        // startTimer,
        // endTimer,
    } = useDraftTimer(state?.timeLimit);

    useEffect(() => {
        if(spectatorConnections?.length === 0) return;
        sendToSpectators({
            type: 'STATE_UPDATE',
            content: {
                ready_check: [true, true],
                draft: draft.draft,
                names: names,
                time_limit: state.timeLimit,
                has_time_limits: state.hasTimeLimits,
                timer_end: new Date().getTime() + 60000,
                spectator_link: state.spectatorLink,
            }
        });
    }, [draft.draft, spectatorConnections, sendToSpectators, names, state]);

    useEffect(() => {
        setNavigationContent({
            type: 'draft',
            side: currentPick.side,
            // timeLeft,
            // timeLimit,
            names,
        });
        return () => setNavigationContent({});
    }, [setNavigationContent, names, currentPick]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue"/>
                <ChampionSelectionDisplay {...draft}>
                    <h3>
                        debug
                    </h3>
                    {JSON.stringify({
                        side: currentPick.blue,
                        pick_number: draft.draft.p,
                        id: peerID,
                        connections: peer.connections.length,
                        disconnected: peer.disconnected,
                    }, null, 8)}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red"/>
            </div>
        </main>
    ); 
}

export default memo(SinglePlayerDraft);
