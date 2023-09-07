type MouseAndTouchEvents = {
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onTouchCancel: (e: React.TouchEvent) => void;
};

export const useMouseAndTouchEvents = (
    mouseDownCallback: () => void,
    mouseUpCallback: () => void
): MouseAndTouchEvents => {

    const commonStart = (e: Event) => {
        mouseDownCallback();
    };

    const commonEnd = (e: Event) => {
        mouseUpCallback();
    };

    return {
        onMouseDown: (e: React.MouseEvent) => commonStart(e.nativeEvent),
        onMouseUp: (e: React.MouseEvent) => commonEnd(e.nativeEvent),
        onMouseLeave: (e: React.MouseEvent) => commonEnd(e.nativeEvent),
        onTouchStart: (e: React.TouchEvent) => commonStart(e.nativeEvent),
        onTouchEnd: (e: React.TouchEvent) => { e.preventDefault(); commonEnd(e.nativeEvent); },
        onTouchCancel: (e: React.TouchEvent) => { e.preventDefault(); commonEnd(e.nativeEvent); },
    };
};
