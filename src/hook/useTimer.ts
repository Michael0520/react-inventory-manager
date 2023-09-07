import { useEffect, useRef } from "react";

export const useTimer = (callback: () => void, delay: number) => {
    const savedCallback = useRef(callback);
    const timerId = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    const startTimer = () => {
        if (timerId.current === null) {
            timerId.current = setInterval(() => {
                savedCallback.current();
            }, delay);
        }
    };

    const clearTimer = () => {
        if (timerId.current !== null) {
            clearInterval(timerId.current);
            timerId.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (timerId.current !== null) {
                clearInterval(timerId.current);
            }
        };
    }, []);

    return { startTimer, clearTimer };
};
