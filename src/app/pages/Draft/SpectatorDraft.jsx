import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData'
import './Draft.scss';

const SpectatorDraft = ({ peerID, connect, message, setNavigationContent }) => {
    const { id } = useParams();
    const { draft, setDraft, currentPick, teamRenderData } = useDraftRenderData();
    const [readyCheck, setReadyCheck] = useState(null);

    const {
        timeLeft,
        timerEnd,
        setTimerEnd,
        setOn,
    } = useDraftTimer();

    useEffect(() => {
        if (peerID) connect(id, 'spectator');
    }, [connect, peerID, id]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setTimerEnd(message.content?.timer_end);
        setDraft(message.content?.draft);
        setReadyCheck(message.content?.ready_check);
        setOn(message.content?.has_time_limits);
    }, [message, setDraft, setTimerEnd, setOn, currentPick, setNavigationContent]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setNavigationContent({
            type: 'draft',
            timeLimit: message.content?.time_limit,
            timeLeft,
            timerEnd,
            names: message.content?.names,
            side: currentPick.side,
        });
        return () => setNavigationContent({});
    }, [timeLeft, timerEnd, message, currentPick, setNavigationContent]);

    if (!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay draft={draft} spectator>
                    <br />
                    <br />
                    <h3>
                        debug
                    </h3>
                    {JSON.stringify({
                        side: currentPick.blue,
                        pick_number: draft.p,
                        id: peerID,
                    }, null, 8)}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default SpectatorDraft;
