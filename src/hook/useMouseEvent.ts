type MouseEvents = {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
};

const useMouseEvent = (mouseDownCallback: () => void, mouseUpCallback: () => void): MouseEvents => {
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

export default useMouseEvent;
