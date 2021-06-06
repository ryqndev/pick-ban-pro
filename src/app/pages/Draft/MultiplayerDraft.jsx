import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const MultiplayerDraft = ({ setNavigationContent, spectators, connection, message, update, peerID }) => {
    const { id } = useParams();
    const { timer, currentPick, teamRenderData, select, undo, lockin, ...draft } = useDraftHost(setNavigationContent, spectators, update);
    const [readyCheck, setReadyCheck] = useState(() => [false, false]);

    // auto start game when both ready checks are true
    useEffect(() => {
        if (readyCheck[0] && readyCheck[1] && draft.draft.p === -1) lockin();
    }, [readyCheck, draft, lockin]);

    const lockinWithReadyCheck = () => {
        if (readyCheck[0] && readyCheck[1]) lockin();
        else setReadyCheck(prevReady => [true, prevReady[1]]);
    }

    useEffect(() => {
        if (!message || !message?.type) return;
        switch (message.type) {
            // case 'READY_UP':
            //     setReadyCheck(prevReady => [prevReady[0], true]);
            //     break;
            // case 'LOCK_IN':
            //     lockin();
            //     break;
            // case 'SELECT':
            //     select(message.content);
            //     break;

            default:
                return;
        }
    }, [message, setReadyCheck, select, lockin]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} lockin={lockinWithReadyCheck} select={select} undo={undo}>
                    {{
                        ...timer,
                        challenge: true,
                        connection,
                        spectators: spectators,
                        peerID,
                    }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default memo(MultiplayerDraft);