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

    const onTimerEnd = () => draft.forceLockin() && startTimer();
    const lockinWithTimer = () => lockin() && startTimer();
    const undoWithTimer = () => undo() && startTimer();



    const {
        timeLimitInSeconds,
        timeLeft,
        timerEnd,
        startTimer,
    } = useDraftTimer(state?.hasTimeLimits ,state?.timeLimit, onTimerEnd);

    useEffect(() => {
        if (!spectatorConnections?.length) return;
        sendToSpectators({
            type: 'STATE_UPDATE',
            content: {
                ready_check: true,
                draft: draft.draft,
                names: names,
                time_limit: state.timeLimit,
                has_time_limits: state.hasTimeLimits,
                timer_end: timerEnd,
                spectator_link: state.spectatorLink,
            }
        });
    }, [draft.draft, spectatorConnections, timerEnd, sendToSpectators, names, state]);

    useEffect(() => {
        setNavigationContent({
            type: 'draft',
            side: currentPick.side,
            timerEnd,
            timeLeft,
            timeLimit: timeLimitInSeconds,
            names,
        });
        return () => setNavigationContent({});
    }, [setNavigationContent, timeLeft, timerEnd, timeLimitInSeconds, names, currentPick]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} lockin={lockinWithTimer} undo={undoWithTimer}>
                    {{
                        ...state,
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
