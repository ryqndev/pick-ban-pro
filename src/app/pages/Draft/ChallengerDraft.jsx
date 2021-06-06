import useDraftClient from '../../controller/hooks/useDraftClient';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const ChallengerDraft = ({ peerID, connect, message, send, setNavigationContent }) => {
    const {
        teamRenderData,
        draft,
        currentPick,
        readyCheck,
    } = useDraftClient('challenger', setNavigationContent, peerID, connect, message);

    const lockin = () => {
        if(draft.p === -1) send({type: 'READY_UP'});
        else send({type: 'LOCK_IN'});
    }
    const select = (champion) => {
        send({type: 'SELECT', content: champion});
    }
    const undo = () => {
        send({type: 'UNDO'});
    }

    if (!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay draft={draft} select={select} lockin={lockin} undo={undo}>
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
