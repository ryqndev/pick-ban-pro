import Peer from 'peerjs';
import { useState, useEffect, useCallback } from 'react'

const usePeer = (draftState={}) => {
    const [peer, setPeer] = useState(() => new Peer());
    const [connection, setConnection] = useState(null);
    const [spectatorConnections, setSpectatorConnections] = useState([]);
    const [peerID, setPeerID] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!peer || (peer?.destroyed ?? true)) return setPeer(new Peer());
        peer.on('open', id => {
            setPeerID(id);
        });
        return () => {
            peer.destroy();
            setPeerID('');
        }
    }, [peer]);

    /**
     * Listen for messages AFTER connection established 
     * after the connect() function is executed and completed
     */
    useEffect(() => {
        if (!connection) return;

        connection.on('open', () => {
            connection.on('data', setMessage);
        });
    }, [connection]);

    /**
     * Listen for connections AFTER peer object created
     */
    const listen = useCallback(() => {
        if(!peerID) return;

        peer.on('connection', (newConnection) => {
            console.log("NEW [connection]", newConnection);
            switch(newConnection?.metadata?.type) {
                case 'spectator':
                    newConnection.on('open', () => {
                        newConnection.send({type: 'STATE_UPDATE', content: draftState});
                    });
                    return setSpectatorConnections(spectators => [...spectators, newConnection]);
                default:
                    setConnection(newConnection); 
            }
        });
    }, [peer, peerID, draftState, setSpectatorConnections]);

    useEffect(() => {
        spectatorConnections.forEach(connection => {
            connection.send({type: 'STATE_UPDATE', content: draftState});
        });
    }, [draftState, spectatorConnections]);

    const connect = useCallback((id, connectionType) => {
        setConnection(peer.connect(id, {metadata: {type: connectionType}}));
    }, [peer]);

    const send = useCallback(message => {
        if(!connection) return console.log('Not connected to anyone!');
        connection.send(message);
    }, [connection]);

    return {
        peer,
        peerID,
        setPeer,
        setPeerID,
        listen,
        message,
        connection,
        connect,
        send,
    };
}

export default usePeer;
