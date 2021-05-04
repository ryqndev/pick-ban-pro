import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelect from '../../components/ChampionSelect';
import './Draft.scss';

const Draft = () => {
    const {blueTeamRenderData, redTeamRenderData, select, currentPick} = useDraftLogicController();

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={currentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelect select={select}/>
                <TeamPickDisplay isLeft={false} currentPick={currentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    )
}

export default Draft;
