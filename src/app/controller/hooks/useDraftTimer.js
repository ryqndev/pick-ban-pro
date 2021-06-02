import { useState, useEffect, useCallback } from 'react';

/**
 * @function useDraftTimer draft timer hook that manages the drafting timer
 * 
 * This hook manages the timer by manipulating the timerEnd state.
 * 
 * @param {Number} timeLimit Time (in seconds) per pick - default: 30
 */
const useDraftTimer = (timeLimit, onTimerEnd=()=>{}) => {
    const [timeLimitInSeconds] = useState(timeLimit ?? 30);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerEnd, setTimerEnd] = useState(0);

    const startTimer = useCallback(() => {
        // Pick timer ends at [Current time] + [time limit] + 500ms grace period
        setTimerEnd(new Date().getTime() + timeLimitInSeconds * 1000 + 500);
    }, [timeLimitInSeconds]);

    const endTimer = useCallback(() => { setTimerEnd(0) }, []);

    useEffect(() => {
        if (timerEnd === 0) return;
        const timer = setInterval(() => {
            let newTimeLeft = timerEnd - new Date().getTime();
            setTimeLeft(newTimeLeft / 1000);
            if (newTimeLeft <= -3) {
                clearInterval(timer);
                setTimerEnd(0);
                onTimerEnd();
            }
        }, 250);

        return () => clearInterval(timer);
    }, [timerEnd, startTimer, onTimerEnd]);

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
