import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { BLUE_SIDE_PICKS } from '../../controller/draftLogicControllerUtil.js';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const MultiplayerDraft = ({ setNavigationContent, spectators, connection, setMessage, message, update, peerID }) => {
    const { id } = useParams();
    const { settings, actions, draft, isBlue } = useDraftHost(setNavigationContent, spectators, update);
    const [readyCheck, setReadyCheck] = useState(() => [false, false]);

    // auto start game when both ready checks are true
    useEffect(() => {
        if (readyCheck[0] && readyCheck[1] && draft.p === -1) actions.lockin();
    }, [readyCheck, draft, actions]);

    const lockinWithReadyCheck = () => {
        if (readyCheck[0] && readyCheck[1]) actions.lockin();
        setReadyCheck(prevReady => [true, prevReady[1]]);
    }

    const enemyTurnToMove = () => {
        const blueTeamToMove = BLUE_SIDE_PICKS.has(draft.p);
        return isBlue ? !blueTeamToMove : blueTeamToMove;
    }

    useEffect(() => {
        if (!message || !message?.type) return;
        switch (message.type) {
            case 'READY_UP':
                setReadyCheck(prevReady => [prevReady[0], true]);
                break;
            case 'LOCK_IN':
                enemyTurnToMove() && actions.lockin();
                break;
            case 'SELECT':
                enemyTurnToMove() && actions.select(message.content);
                break;
            case 'UNDO':
                // check its their turn
                // prompt host to allow
                actions.undo();
                break;
            case 'SETTINGS_UPDATE':
                // prompt host to allow
                break;
            default:
                break;
        }
        setMessage(null);
    }, [message, actions, setMessage]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.blue} side="blue" />
                <ChampionSelectionDisplay lockin={lockinWithReadyCheck} {...draft} {...actions}>
                    {{
                        ...settings,
                        challenge: true,
                        connection,
                        spectators: spectators,
                        peerID,
                    }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.red} side="red" />
            </div>
        </main>
    );
}

export default memo(MultiplayerDraft);
