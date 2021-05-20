import {useState, useEffect, useCallback} from 'react';

const useDraftTimer = (options) => {
    const [timeLimit] = useState(options?.timeLimit ?? 30000);
    const [timeLeft, setTimeLeft] = useState(() => timeLimit / 1000);

    const startTimer = useCallback(() => {
        let date = new Date();
        date = date.getTime();
        setTimerEnd(date + (timeLimit));
    }, [timeLimit]);

    const endTimer = useCallback(() => {
        setTimerEnd(0);
    }, []);

    const [timerEnd, setTimerEnd] = useState(0);
    
    useEffect(() => {
        if(timerEnd === 0) return;

        const timer = setInterval(() => {
            let newTimeLeft = timerEnd - (new Date().getTime());
            setTimeLeft(newTimeLeft/1000);
            if(newTimeLeft <= -3) startTimer();
        }, 200);
        return () => clearInterval(timer);
    }, [timerEnd, startTimer]);

    return {
        timeLimit,
        timerEnd,
        timeLeft,
        startTimer,
        endTimer,
    }
}

export default useDraftTimer;
