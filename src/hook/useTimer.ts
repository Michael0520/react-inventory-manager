import { useRef, useCallback } from 'react';

export const useTimer = (callback: () => void, initialDelay: number, continuousDelay: number) => {
    const callbackRef = useRef(callback);
    const initialTimerRef = useRef<NodeJS.Timeout | null>(null);
    const continuousTimerRef = useRef<NodeJS.Timeout | null>(null);


    callbackRef.current = callback;

    const startTimer = useCallback(() => {
        // 單次觸發
        callbackRef.current();

        // 設置初始定時器
        initialTimerRef.current = setTimeout(() => {
            // 設置連續定時器
            continuousTimerRef.current = setInterval(() => {
                callbackRef.current();
            }, continuousDelay);
        }, initialDelay);
    }, [initialDelay, continuousDelay]);

    const clearTimer = useCallback(() => {
        if (initialTimerRef.current) clearTimeout(initialTimerRef.current);
        if (continuousTimerRef.current) clearInterval(continuousTimerRef.current);
    }, []);

    return { startTimer, clearTimer };
};
