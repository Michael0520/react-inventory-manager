type MouseAndTouchEvents = {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
    onTouchCancel: () => void;
};

export const useMouseAndTouchEvents = (
    mouseDownCallback: () => void,
    mouseUpCallback: () => void
): MouseAndTouchEvents => {
    const commonStart = () => {
        mouseDownCallback();
    };

    const commonEnd = () => {
        mouseUpCallback();
    };

    return {
        onMouseDown: commonStart,
        onMouseUp: commonEnd,
        onMouseLeave: commonEnd,
        onTouchStart: commonStart,
        onTouchEnd: commonEnd,
        onTouchCancel: commonEnd,
    };
};
