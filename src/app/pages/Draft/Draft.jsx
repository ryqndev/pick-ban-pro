import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import './Draft.scss';

const Draft = ({setNavRenderData}) => {
    const {draftString, matchName, teamNames} = useParams();
    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        ...draft
    } = useDraftLogicController(draftString);

    useEffect(() => {
        setNavRenderData({draft: true, matchName, teamNames});
        return () => setNavRenderData({draft: false});
    }, [setNavRenderData, matchName, teamNames]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay currentPick={currentPick} {...draft} />
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    )
}

export default Draft;
