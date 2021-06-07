import Swal from 'sweetalert2';
import useDraftClient from '../../controller/hooks/useDraftClient';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelectionDisplay from './ChampionSelectionDisplay';
import './Draft.scss';

const ChallengerDraft = ({ send, ...props }) => {
    const { draft, readyCheck, settings } = useDraftClient({ type: 'challenger', ...props });

    const lockin = () => {
        if(draft.p === -1 && !readyCheck[1]) send({type: 'READY_UP'});
        else send({type: 'LOCK_IN', state: draft.p});
    }
    const select = (champion) => {
        send({type: 'SELECT', content: champion, state: draft.p});
    }
    const undo = () => {
        Swal.fire({
            title: 'Undo Request',
            text: "Would you like to send an undo request to your opponent?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'No, don\'t send.',
        }).then((result) => {
            if (result.isConfirmed) send({type: 'UNDO', state: draft.p});
        });
    }

    if (!readyCheck) return (
        <main className="draft--wrapper wait-ready-check">
            <h1>Waiting for host to start...</h1>
        </main>
    );

    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.blue} side="blue" />
                <ChampionSelectionDisplay {...draft} select={select} lockin={lockin} undo={undo} settings={{
                    setOn: () => {},
                    setLimit: () => {},
                    ...settings,
                }} />
                <TeamPickDisplay currentPick={draft.currentPick} teamRenderData={draft.red} side="red" />
            </div>
        </main>
    );
}

export default ChallengerDraft;
