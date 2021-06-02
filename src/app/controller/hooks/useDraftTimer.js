import { useState, useEffect, useCallback } from 'react';

/**
 * @function useDraftTimer draft timer hook that manages the drafting timer
 * 
 * This hook manages the timer by manipulating the timerEnd state. timerEnd
 * 
 * @param {Number} timeLimit Time (in seconds) per pick - default: 30
 */
const useDraftTimer = (timeLimit) => {
    const [timeLimitInSeconds] = useState(timeLimit ?? 30);
    const [timeLeft, setTimeLeft] = useState(timeLimitInSeconds);
    const [timerEnd, setTimerEnd] = useState(0);

    const startTimer = useCallback(() => {
        setTimerEnd(new Date().getTime() + timeLimitInSeconds * 1000);
    }, [timeLimitInSeconds]);

    const endTimer = useCallback(() => { setTimerEnd(0) }, []);

    useEffect(() => {
        if (timerEnd === 0) return;
        const identifier = ~~(Math.random() * 10000);
        const timer = setInterval(() => {
            console.log('timer ' + identifier);
            let newTimeLeft = timerEnd - new Date().getTime();
            setTimeLeft(newTimeLeft / 1000);
            if (newTimeLeft <= -3) {
                clearInterval(timer);
                setTimerEnd(0);
            }
        }, 200);

        return () => {
            clearInterval(timer);
            setTimerEnd(0);
        }
    }, [timerEnd, startTimer]);

    useEffect(() => {
        if(timeLeft <= -3) {
            console.log("Timer has ended");
        }
    }, [timeLeft]);

    return {
        timeLimitInSeconds,
        timerEnd,
        setTimerEnd,
        timeLeft,
        startTimer,
        endTimer,
    }
}

export default useDraftTimer;
