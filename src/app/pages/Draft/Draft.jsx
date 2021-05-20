import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import './Draft.scss';

const Draft = ({setNavRenderData}) => {
    const {draftString, matchName, teamNames} = useParams();

    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        draft, 
        undo, lockin, select
    } = useDraftLogicController(draftString);

	const {
        timeLimit,
        timeLeft,
        startTimer,
        endTimer,
    } = useDraftTimer({});

    useEffect(() => {
        startTimer();
		return endTimer;
    }, [startTimer, endTimer]);

    useEffect(() => {
        setNavRenderData({
            draft: true,
            matchName,
            teamNames,
            bluePick: localCurrentPick.blue,
            timeLeft,
            timeLimit,
        });
        return () => setNavRenderData({draft: false});
    }, [setNavRenderData, timeLeft, localCurrentPick, matchName, teamNames, timeLimit]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay currentPick={currentPick} {...{draft, lockin, select, undo}} />
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    ); 
}

export default Draft;
