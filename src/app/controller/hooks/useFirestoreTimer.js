import { useState, useEffect } from 'react'

const useFirestoreTimer = (timer, forceLockin) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const countdown = setInterval(() => {
            const tempTimeLeft = (timer - Date.now()) / 1000;
            if (tempTimeLeft <= 0) {
                clearInterval(countdown);
            }

            setTimeLeft(tempTimeLeft);
        }, 250);

        return () => {
            clearInterval(countdown);
        }
    }, [timer]);

    return {
        timeLeft,
    }
}

export default useFirestoreTimer;
