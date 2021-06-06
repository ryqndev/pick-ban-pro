import useDraftClient from '../../controller/hooks/useDraftClient';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const SpectatorDraft = ({ peerID, connect, message, setNavigationContent }) => {
    const {
        teamRenderData,
        draft,
        currentPick,
        readyCheck,
    } = useDraftClient('spectator', setNavigationContent, peerID, connect, message);

    if (!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay draft={draft} spectator />
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default SpectatorDraft;
