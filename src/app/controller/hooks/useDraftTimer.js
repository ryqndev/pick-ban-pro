import { useState, useEffect, useCallback } from 'react';

/**
 * @function useDraftTimer draft timer hook that manages the drafting timer
 * 
 * This hook manages the timer by manipulating the timerEnd state.
 * 
 * @param {Number} timeLimit Time (in seconds) per pick - default: 30
 */
const useDraftTimer = (hasTimeLimits=false, timeLimit=30, onTimerEnd=()=>{}) => {
    const [on, setOn] = useState(hasTimeLimits);
    const [timeLimitInSeconds] = useState(timeLimit);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerEnd, setTimerEnd] = useState(0);

    const startTimer = useCallback(() => {
        // Pick timer ends at [Current time] + [time limit] + 500ms grace period
        if(!on) return;
        setTimerEnd(new Date().getTime() + timeLimitInSeconds * 1000 + 500);
    }, [timeLimitInSeconds, on]);

    const endTimer = useCallback(() => { setTimerEnd(0) }, []);

    useEffect(() => {
        if (timerEnd === 0 || !on) return;
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
    }, [on, timerEnd, startTimer, onTimerEnd]);

    return {
        timeLimitInSeconds,
        timerEnd,
        setTimerEnd,
        timeLeft,
        startTimer,
        endTimer,
        setOn,
    }
}

export default useDraftTimer;