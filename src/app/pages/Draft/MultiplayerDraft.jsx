import { useEffect, useState, memo } from 'react';
import Swal from 'sweetalert2';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const MultiplayerDraft = ({ setNavigationContent, spectators, connection, setMessage, message, update, peerID }) => {
    const { settings, actions, draft } = useDraftHost(setNavigationContent, spectators, update, true);
    const [readyCheck, setReadyCheck] = useState(() => [false, false]);

    // auto start game when both ready checks are true
    useEffect(() => {
        if (readyCheck[0] && readyCheck[1] && draft.p === -1) actions.lockin();
    }, [readyCheck, draft, actions]);

    const lockinWithReadyCheck = () => {
        if (readyCheck[0] && readyCheck[1]) actions.lockin();
        setReadyCheck(prevReady => [true, prevReady[1]]);
    }

    const undoWithRequest = () => {

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
                Swal.fire({
                    title: 'Undo Request',
                    text: "Your opponent has requested to undo the last pick.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Allow',
                    cancelButtonText: 'Decline',
                }).then((result) => {
                    if (result.isConfirmed) actions.undo();
                });
                break;
            case 'SETTINGS_UPDATE':
                Swal.fire({
                    title: 'Settings Change Request',
                    text: "Your opponent has requested to change the draft settings: ",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Allow',
                    cancelButtonText: 'Decline',
                }).then((result) => {
                    // if (result.isConfirmed) actions.undo();
                });
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
                <ChampionSelectionDisplay lockin={lockinWithReadyCheck} {...draft} {...actions} multiplayer settings={{
                    ...settings,
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
