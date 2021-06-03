import Peer from 'peerjs';
import { useState, useEffect, useCallback } from 'react'

const usePeer = () => {
    const [peer, setPeer] = useState(() => new Peer());
    const [connection, setConnection] = useState(null);
    const [spectatorConnections, setSpectatorConnections] = useState([]);
    const [peerID, setPeerID] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!peer || (peer?.destroyed ?? true)) return setPeer(new Peer());
        peer.on('open', setPeerID);
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
        connection.on('open', () => { connection.on('data', setMessage) });
    }, [connection]);

    useEffect(() => {
        if(!peerID) return;

        const connector = (newConnection) => {
            switch(newConnection?.metadata?.type) {
                case 'spectator':
                    newConnection.on('open', () => {
                        setSpectatorConnections(spectators => [...spectators, newConnection]);
                    });
                    break;
                default:
                    setConnection(newConnection); 
            }
        }

        peer.on('connection', connector);
        return () => peer.off('connection', connector);
    }, [peer, peerID, setSpectatorConnections]);

    const connect = useCallback((id, connectionType) => {
        setConnection(peer.connect(id, {metadata: {type: connectionType}}));
    }, [peer]);

    const send = useCallback(message => {
        if(!connection) return console.error('Not connected to anyone!');
        connection.send(message);
    }, [connection]);
    
    const sendToSpectators = useCallback(message => {
        spectatorConnections.forEach(connection => {
            connection.send(message);
        });
    }, [spectatorConnections]);

    return {
        peer,
        peerID,
        setPeer,
        setPeerID,
        message,
        connection,
        spectatorConnections,
        connect,
        send,
        sendToSpectators,
    };
}

export default usePeer;
