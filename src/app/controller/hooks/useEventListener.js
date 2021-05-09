import { useRef, useEffect } from 'react';

const useEventListener = (type, handler) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = event => ref.current(event);
        window.addEventListener(type, eventListener);
        return () => {window.removeEventListener(type, eventListener)};
    }, [type]);
};

export default useEventListener;
