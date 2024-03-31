"use client";

import { useCallback, useEffect, useState } from 'react';

export default (props) => {
    const { recaptchaKey } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        globalThis.recaptchaLoadCallback = () => {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            queue.forEach((onLoad) => {
                onLoad();
            });
        }
    }, [isLoaded]);

    const scriptUrl = `https://www.google.com/recaptcha/api.js?render=${recaptchaKey}&onload=recaptchaLoadCallback`;

    const getRecaptchaData = useCallback(async (formId) => {
        return new Promise(async (resolve) => {
            const generateToken = async () => {
                const token = await globalThis.grecaptcha.execute(
                    recaptchaKey,
                    {
                        action: formId
                    }
                );
    
                return token;
            };
    
            const resolveToken = async () => {
                const token = await generateToken();

                resolve(token);
            };

            if (!isLoaded) {               
                setQueue((currentQueue) => {
                    return [
                        ...currentQueue,
                        resolveToken
                    ];
                });
            }
    
            resolveToken();
        })
    }, [isLoaded]);

    return {
        scriptUrl,
        getRecaptchaData
    };
};