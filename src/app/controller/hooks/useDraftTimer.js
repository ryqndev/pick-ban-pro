import { useState, useEffect, useCallback } from 'react';

const useDraftTimer = (options) => {
    const [timeLimitInMilliseconds] = useState(options?.timeLimitInMilliseconds ?? 30000);
    const [timeLeft, setTimeLeft] = useState(() => timeLimitInMilliseconds / 1000);
    const [timerEnd, setTimerEnd] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startTimer = useCallback(() => {
        let date = new Date();
        date = date.getTime();
        setTimerEnd(date + (timeLimitInMilliseconds));
    }, [timeLimitInMilliseconds]);

    const endTimer = useCallback(() => { setTimerEnd(0) }, []);

    useEffect(() => {
        if (timerEnd === 0) return;
        setIsRunning(true);
        const timer = setInterval(() => {
            let newTimeLeft = timerEnd - (new Date().getTime());
            setTimeLeft(newTimeLeft / 1000);
            if (newTimeLeft <= -3) startTimer();
        }, 200);

        return () => {
            clearInterval(timer);
            setIsRunning(false);
        }
    }, [timerEnd, startTimer]);

    return {
        timeLimitInMilliseconds,
        timerEnd,
        timeLeft,
        isRunning,
        startTimer,
        endTimer,
    }
}

export default useDraftTimer;
