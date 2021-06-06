import { useState, useEffect, useCallback } from 'react';

/**
 * @function useDraftTimer draft timer hook that manages the drafting timer
 * 
 * This hook manages the timer by manipulating the End state.
 * 
 * @param {Number} timeLimit Time (in seconds) per pick - default: 30
 */
const useDraftTimer = (hasTimeLimits = false, timeLimit = 30, onEnd = () => { }) => {
    const [on, setOn] = useState(hasTimeLimits);
    const [limit, setLimit] = useState(timeLimit);
    const [time, setTime] = useState(0);
    const [end, setEnd] = useState(0);

    const startTimer = useCallback(() => {
        // Pick timer ends at [Current time] + [time limit] + 500ms grace period
        if (!on) return;
        setEnd(new Date().getTime() + limit * 1000 + 500);
    }, [limit, on]);

    useEffect(() => {
        if (end === 0 || !on) return;
        const timer = setInterval(() => {
            let newtime = end - new Date().getTime();
            setTime(newtime / 1000);
            if (newtime <= -3) {
                clearInterval(timer);
                setEnd(0);
                setTime(limit);
                onEnd();
            }
        }, 250);

        return () => clearInterval(timer);
    }, [on, end, startTimer, setTime, limit, onEnd]);

    useEffect(() => { if (!on) setEnd(0) }, [on]);

    return {
        on,
        setOn,
        limit,
        setLimit,
        time,
        end,
        setEnd,
        startTimer,
    }
}

export default useDraftTimer;
