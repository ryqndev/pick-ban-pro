import { memo } from 'react';
import { useParams } from 'react-router-dom';
import useDraftHost from '../../controller/hooks/useDraftHost';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import './Draft.scss';

const SinglePlayerDraft = ({ setNavigationContent, spectators, update, peerID }) => {
    const { draftString } = useParams();
    const { settings, draft, actions } = useDraftHost(setNavigationContent, spectators, update, draftString);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} {...actions}>
                    {{
                        ...settings,
                        spectators,
                        peerID,
                    }}
                </ChampionSelectionDisplay>
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.red} side="red" />
            </div>
        </main>
    );
}

export default memo(SinglePlayerDraft);
