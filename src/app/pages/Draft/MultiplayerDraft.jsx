import { useEffect, memo } from 'react';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import { confirmTimerToggleRequest, confirmUndoRequest, promptUndoRequest } from '../../controller/libs/sweetalert';
import './Draft.scss';

const MultiplayerDraft = ({ setNavigationContent, spectators, connection, setMessage, message, send, update, peerID }) => {
    const { settings, actions, draft, isBlue, readyCheck, setReadyCheck } = useDraftHost(setNavigationContent, spectators, update, true);

    // auto start game when both ready checks are true
    useEffect(() => {
        if (readyCheck[0] && readyCheck[1] && draft.p === -1) actions.lockin();
    }, [readyCheck, draft, actions]);

    const lockinWithReadyCheck = () => {
        if (readyCheck[0] && readyCheck[1]) return actions.lockin('HOST');
        setReadyCheck(prevReady => [true, prevReady[1]]);
    }

    const undo = () => {
		promptUndoRequest(() => send({ type: 'UNDO', state: draft.p }));
    }

    useEffect(() => {
        if (!message || !message?.type) return;
        switch (message.type) {
            case 'READY_UP':
                setReadyCheck(prevReady => [prevReady[0], true]);
                break;
            case 'LOCK_IN':
                actions.lockin('CLIENT');
                break;
            case 'SELECT':
                actions.select(message.content, 'CLIENT');
                break;
            case 'UNDO':
                confirmUndoRequest(actions.undo);
                break;
            case 'CONFIRM_UNDO':
                actions.undo();
                break;
            case 'TIMER_TOGGLE_REQUEST':
                confirmTimerToggleRequest(message.content, () => settings.setOn(message.content));
                break;
            default:
                break;
        }
        setMessage(null);
    }, [message, actions, setReadyCheck, settings, setMessage]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} {...actions} lockin={lockinWithReadyCheck} undo={undo} multiplayer settings={{
                    ...settings,
                    isBlue,
                    type: 'HOST',
                    challenge: true,
                    readyCheck,
                    connection,
                    spectators: spectators,
                    peerID,
                }}/>
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.red} side="red" />
            </div>
        </main>
    );
}

export default memo(MultiplayerDraft);
