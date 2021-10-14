import useDraftClient from '../../controller/hooks/useDraftClient';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const SpectateDraft = (props) => {
    const { render, settingUp, draft, position } = useDraftClient({ type: 'spectator', ...props });

    if (settingUp) return (
        <main className='draft--wrapper wait-ready-check'>
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className='draft--wrapper'>
            <div className='pickban-select--wrapper'>
                <TeamPickDisplay currentPick={position} teamRenderData={render.blue} side='blue' />
                <ChampionSelectionDisplay draft={{d: draft, p: position}} settings={{type: 'SPECTATOR'}}/>
                <TeamPickDisplay currentPick={position} teamRenderData={render.red} side='red' />
            </div>
        </main>
    );
}

export default SpectateDraft;
