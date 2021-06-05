import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useDraftRenderData from '../../controller/hooks/useDraftRenderData'
import './Draft.scss';

const ChallengerDraft = ({ peerID, connect, message, setNavigationContent }) => {
    const { id } = useParams();
    const { draft, setDraft, currentPick, teamRenderData } = useDraftRenderData();
    const [readyCheck, setReadyCheck] = useState(null);

    const {
        time,
        end,
        setEnd,
        setOn,
    } = useDraftTimer();

    useEffect(() => { if (peerID) connect(id, 'challenger') }, [connect, peerID, id]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setEnd(message.content?.end);
        setDraft(message.content?.draft);
        setReadyCheck(message.content?.ready_check);
        setOn(message.content?.on);
    }, [message, setDraft, setEnd, setOn, currentPick, setNavigationContent]);

    useEffect(() => {
        if (!message || !message?.content) return;
        setNavigationContent({
            type: 'draft',
            limit: message.content?.limit,
            time,
            end,
            names: message.content?.names,
            side: currentPick.side,
        });
        return () => setNavigationContent({});
    }, [time, end, message, currentPick, setNavigationContent]);

    if (!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay draft={draft}>
                {{
                        // on,
                        // setOn,
                        // limit,
                        // setLimit,
                        // spectators: spectatorConnections,
                        // peerID,
                }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default ChallengerDraft;
