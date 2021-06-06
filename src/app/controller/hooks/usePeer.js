import Peer from 'peerjs';
import { useState, useEffect, useCallback } from 'react'

const usePeer = () => {
    const [peer, setPeer] = useState(() => new Peer());
    const [connection, setConnection] = useState(null);
    const [spectators, setSpectators] = useState([]);
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
        connection.on('open', () => {
            console.log("client got new connection")
            connection.on('data', setMessage);
            connection.on('close', console.error);
            connection.on('error', console.error);
        });
    }, [connection]);

    useEffect(() => {
        if (!peerID) return;

        const connector = (newConnection) => {
            switch (newConnection?.metadata?.type) {
                case 'spectator':
                    newConnection.on('open', () => {
                        setSpectators(prev => [...prev, newConnection]);
                    });
                    break;
                case 'challenger':
                    //TODO verify by using hash that challenger is allowed 
                    newConnection.on('open', () => { 
                        setConnection(newConnection);
                        newConnection.on('data', setMessage);
                    });
                    break;
                default:
                    return;
            }
        }

        peer.on('connection', connector);
        return () => peer.off('connection', connector);
    }, [peer, peerID, setSpectators]);

    const connect = useCallback((id, connectionType) => {
        setConnection(peer.connect(id, { metadata: { type: connectionType } }));
    }, [peer]);

    const send = useCallback(message => {
        if (!connection) return console.error('Not connected to anyone!');
        connection.send(message);
    }, [connection]);

    const update = useCallback(message => {
        if(connection) connection.send(message);
        let connectedSpectators = [...spectators];
        connectedSpectators = connectedSpectators.filter(connection => {
            if (connection.open) {
                connection.send(message);
                return true;
            }
            return false;
        });
        if (connectedSpectators.length !== spectators.length) setSpectators(connectedSpectators);
    }, [connection, spectators]);

    return {
        peer,
        peerID,
        setPeer,
        setPeerID,
        message,
        setMessage,
        connection,
        spectators,
        connect,
        send,
        update,
    };
}

export default usePeer;
