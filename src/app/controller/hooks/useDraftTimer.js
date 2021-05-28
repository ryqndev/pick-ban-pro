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
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = useCallback(() => {
        setTimerEnd(new Date().getTime() + timeLimitInSeconds * 1000);
    }, [timeLimitInSeconds]);

    const endTimer = useCallback(() => { setTimerEnd(0) }, []);

    useEffect(() => {
        if (timerEnd === 0) return;
        setIsRunning(true);
        const timer = setInterval(() => {
            let newTimeLeft = timerEnd - new Date().getTime();
            setTimeLeft(newTimeLeft / 1000);
            if (newTimeLeft <= -3){
                clearInterval(timer);
                setIsRunning(false);
            }
        }, 200);

        return () => {
            clearInterval(timer);
            setIsRunning(false);
        }
    }, [timerEnd, startTimer]);

    return {
        timeLimitInSeconds,
        timerEnd,
        timeLeft,
        isRunning,
        startTimer,
        endTimer,
    }
}

export default useDraftTimer;
