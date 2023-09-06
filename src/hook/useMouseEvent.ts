type MouseEvents = {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
};

export const useMouseEvent = (mouseDownCallback: () => void, mouseUpCallback: () => void): MouseEvents => {
    const onMouseDown = () => {
        mouseDownCallback();
    };

    const onMouseUp = () => {
        mouseUpCallback();
    };

    const onMouseLeave = () => {
        mouseUpCallback();
    };


    return {
        onMouseDown,
        onMouseUp,
        onMouseLeave,
    };
};

