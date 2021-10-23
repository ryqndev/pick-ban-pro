import { useState, useContext, useEffect } from 'react';
import { updateDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import db from '../../../controller/libs/firestore';
import ChampionsContext from '../../../controller/contexts/ChampionsContext';


const useCreateRoom = (matchName, blueTeamName, redTeamName, hasTimeLimits, timeLimit, setAreOptionsFinalized) => {
    const [[roomid, bluehash, redhash]] = useState(() => [
        generate(6),
        generate(4),
        generate(4),
    ]);
    const { patch } = useContext(ChampionsContext);


    function generate(length = 10) {
        return (Math.random() + 1).toString(36).substring(2, length + 2);
    }
    useEffect(() => {
        setDoc(doc(db, 'livedrafts', roomid), {
            hashes: {
                blue: bluehash,
                red: redhash,
            },
            settingUp: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }, [roomid, bluehash, redhash]);

    const handleSubmit = event => {
        event.preventDefault();
        setAreOptionsFinalized(true);
        updateDoc(doc(db, 'livedrafts', roomid), {
            draft: new Array(20).fill(null),
            position: -1,
            settingUp: false,
            options: {
                hasTimeLimits,
                timeLimit,
            },
            details: {
                patch: patch,
                names: {
                    blue: blueTeamName.length ? blueTeamName : 'Blue Team',
                    red: redTeamName.length ? redTeamName : 'Red Team',
                    match: matchName.length ? matchName : 'Pick Ban Pro',
                },
            },
            timer: 0,
            ready: [false, false],
            updatedAt: serverTimestamp(),
        }).catch(err => {
            console.error(err);
            setAreOptionsFinalized(false);
        });
    };

    return {
        roomid, 
        bluehash,
        redhash,
        handleSubmit,
    }
}

export default useCreateRoom;
