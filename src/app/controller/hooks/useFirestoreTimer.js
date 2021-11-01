import { useState, useEffect } from 'react'

const useFirestoreTimer = (timer, forceLockin) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if(!timer) return;
        const countdown = setInterval(() => {
            const tempTimeLeft = (timer - Date.now()) / 1000;
            if (tempTimeLeft <= 0) {
                clearInterval(countdown);
                forceLockin();
                return;
            }

            setTimeLeft(tempTimeLeft);
        }, 250);

        return () => {
            clearInterval(countdown);
        }
    }, [timer, forceLockin]);

    return {
        timeLeft,
    }
}

export default useFirestoreTimer;
