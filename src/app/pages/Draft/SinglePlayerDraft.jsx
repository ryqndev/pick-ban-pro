import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import './Draft.scss';

const SinglePlayerDraft = ({ setNavigationContent, spectators, update, peerID }) => {
    const { draftString } = useParams();
    const {timer, currentPick, teamRenderData, ...draft} = useDraftHost(setNavigationContent, spectators, update, draftString);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.blue} side="blue" />
                <ChampionSelectionDisplay {...draft}>
                    {{
                        ...timer,
                        spectators,
                        peerID,
                    }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={currentPick} teamRenderData={teamRenderData.red} side="red" />
            </div>
        </main>
    );
}

export default memo(SinglePlayerDraft);
