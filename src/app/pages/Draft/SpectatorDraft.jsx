import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import useDraftLogicController from '../../controller/hooks/useDraftLogicController';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay/ChampionSelectionDisplay';
// import useDraftTimer from '../../controller/hooks/useDraftTimer';
import './Draft.scss';

const SpectatorDraft = ({peerID, connect, message}) => {
    const {id} = useParams();
    const {
        blueTeamRenderData, 
        redTeamRenderData,
        localCurrentPick,
        currentPick,
        setDraft,
        setCurrentPick,
        ...draft
    } = useDraftLogicController();

	// const {
    //     timeLimit,
    //     timeLeft,
    //     isRunning,
    //     startTimer,
    //     endTimer,
    // } = useDraftTimer();

    useEffect(() => {
        if(!peerID) return;
        connect(id);
    }, [connect, peerID, id]);

    useEffect(() => {
        if(!message) return;
        console.log("got new message fo sho");
        if(message?.type === 'STATE_UPDATE'){
            setDraft(message.content?.draft);
            setCurrentPick(message.content?.current_pick);
        }
    }, [message, setDraft, setCurrentPick]);

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

export default SpectatorDraft;
