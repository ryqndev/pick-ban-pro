import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
import useDraftTimer from '../../controller/hooks/useDraftTimer';
import './Draft.scss';

const Draft = ({setNavRenderData}) => {
    const {draftString} = useParams();

    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        ...draft
    } = useDraftLogicController(draftString);

	const {
        timeLimit,
        timeLeft,
        isRunning,
        startTimer,
        endTimer,
    } = useDraftTimer();

    useEffect(() => {
        // startTimer();
		// return endTimer;
    }, [startTimer, endTimer]);

    useEffect(() => {
        setNavRenderData({
            type: 'draft',
            side: isRunning ? (localCurrentPick.blue ? 'blue' : 'red') : 'none',
            timeLeft,
            timeLimit,
        });
        return () => setNavRenderData({});
    }, [setNavRenderData, timeLeft, localCurrentPick, isRunning, timeLimit]);

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} currentPick={localCurrentPick} teamPickData={blueTeamRenderData}/>
                <ChampionSelectionDisplay currentPick={currentPick} {...draft} />
                <TeamPickDisplay isLeft={false} currentPick={localCurrentPick} teamPickData={redTeamRenderData} />
            </div>
        </main>
    ); 
}

export default Draft;
