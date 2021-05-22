import Peer from 'peerjs';
import { useState, useEffect, useCallback } from 'react'

const usePeer = () => {
    const [peer, setPeer] = useState(new Peer());
    const [connection, setConnection] = useState(null);
    const [peerID, setPeerID] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!peer || (peer?.destroyed ?? true)) return;
        peer.on('open', id => {
            setPeerID(id);
        });
        return () => {
            peer.destroy();
            setPeerID('');
        }
    }, [peer]);


    useEffect(() => {
        console.log("init event", peer, peerID);
    }, [peer, peerID]);

    useEffect(() => {
        console.log("connecting event", connection);
    }, [connection]);

    /**
     * Listen for messages after connection established
     */
    useEffect(() => {
        if (!connection) return;

        connection.on('open', () => {
            connection.on('data', data => {
                console.log('Received', data);
            });

            connection.send('Connected!');
        });
    }, [connection]);

    const listen = useCallback(() => {
        if(!peerID) return;
        peer.on('connection', setConnection);
    }, [peer, peerID]);

    const connect = useCallback(id => {
        setConnection(peer.connect(id));
    }, [peer]);

    const send = useCallback(() => {
        if(!connection) return console.log('Not connected to anyone!');
        connection.send("yo what up");
    }, [connection]);

    return {
        peer,
        peerID,
        setPeer,
        setPeerID,
        listen,
        connect,
        send,
    };
}

export default usePeer;
