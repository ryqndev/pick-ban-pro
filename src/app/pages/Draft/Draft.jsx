import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import './Draft.scss';

const Draft = ({setNavRenderData}) => {
    const {draftString, matchName, teamNames} = useParams();
    const {
        draft,
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        lockin,
        undo,
        select,
    } = useDraftLogicController(draftString);

    useEffect(() => {
        setNavRenderData({matchName, teamNames});
    }, [setNavRenderData, matchName, teamNames]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay 
                    lockin={lockin} 
                    select={select} 
                    draft={draft} 
                    undo={undo} 
                    currentPick={currentPick}
                />
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    )
}

export default Draft;
