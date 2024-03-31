import { useEffect, useState } from "react";
export const useWaitForReady = (callback) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (callback && ready) {
            callback();
        }
    }, [callback, ready]);

    useEffect(() => {
        setReady(true);
    }, []);

    return {
        ready
    };
};