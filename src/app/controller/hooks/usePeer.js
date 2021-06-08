import Peer from 'peerjs';
import Swal from 'sweetalert2';
import { useState, useEffect, useCallback } from 'react';

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
            connection.on('data', setMessage);
            connection.on('close', console.error);
            connection.on('error', console.error);
        });
    }, [connection]);

    useEffect(() => {
        peer.on('error', err => {
            console.log(err.type)
            switch (err.type) {
                case 'browser-incompatible':
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        html: `Your browser may have disabled WebRTC or not support it. You can still play single player draft but will not be able to have spectators or challengers.
                        <br />
                        <br />

                        If you would like to enable WebRTC, follow <a target="_blank" rel="noopener noreferrer" href="https://myownconference.com/blog/en/webrtc/">these</a> steps.`,
                    });
                    break;
                case 'disconnected':
                    Swal.fire({
                        icon: 'error',
                        title: 'We outtie~',
                        text: 'You have been disconnected',
                    });
                    break;
                case 'peer-unavailable':
                    Swal.fire({
                        icon: 'error',
                        title: 'Who that?',
                        text: 'Link may have expired because draft doesn\'t exist.',
                    });
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong. Code: ' + err.type,
                    });
                    break;
            }
        });

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
        if (connection) connection.send(message);
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
