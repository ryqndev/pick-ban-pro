import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

const PeerDraft = ({peerID, send, connect}) => {
    const {id} = useParams();

    useEffect(() => {
        if(!peerID) return;
        console.log("going boom", id);
        connect(id);
    }, [connect, peerID, id]);

    const boom = () => {
        console.log("big boom");
        send();
    }

    return (
        <main className="draft--wrapper">
            <button onClick={boom}>click this to go boom</button>
        </main>
    );
}

export default PeerDraft;
