import { useEffect, memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import useNames from '../../controller/hooks/useNames';
import './Draft.scss';

const SinglePlayerDraft = ({ setNavigationContent, spectatorConnections, sendToSpectators, peerID }) => {
    const { state } = useLocation();
    const { draftString } = useParams();
    const { teamRenderData, currentPick, lockin, undo, ...draft } = useDraftLogicController(draftString);
    const names = useNames(state?.names);

    const onEnd = () => draft.forceLockin() && startTimer();
    const lockinWithTimer = () => lockin() && startTimer();
    const undoWithTimer = () => undo() && startTimer();

    const { on, setOn, setLimit, limit, time, end, startTimer } = useDraftTimer(state?.hasTimeLimits, state?.timeLimit, onEnd);

    useEffect(() => {
        if (!spectatorConnections?.length) return;
        sendToSpectators({
            type: 'STATE_UPDATE', content: {
                ready_check: true, draft: draft.draft, limit, on, end, names
            }
        });
    }, [draft.draft, spectatorConnections, end, sendToSpectators, names, on, limit, state]);

    useEffect(() => {
        setNavigationContent({ type: 'draft', side: currentPick.side, end, time, limit, names });
        return () => setNavigationContent({});
    }, [setNavigationContent, time, end, limit, names, currentPick]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} lockin={lockinWithTimer} undo={undoWithTimer}>
                    {{
                        ...state,
                        on,
                        setOn,
                        limit,
                        setLimit,
                        spectators: spectatorConnections,
                        peerID,
                    }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default memo(SinglePlayerDraft);
