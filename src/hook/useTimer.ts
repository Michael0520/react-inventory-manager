import { useState, useEffect } from 'react';

export const useTimer = (action: () => void, delay: number = 1000, immediate: boolean = false) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (immediate) {
            action();
        }
        const newTimer = setInterval(() => {
            action();
        }, delay);
        setTimer(newTimer);
    };

    const clearTimer = () => {
        if (timer !== null) {
            clearInterval(timer);
            setTimer(null);
        }
    };

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return {
        startTimer,
        clearTimer,
    };
};
