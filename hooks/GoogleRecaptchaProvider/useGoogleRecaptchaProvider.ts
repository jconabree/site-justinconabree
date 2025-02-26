"use client";

import { useCallback, useEffect, useState } from 'react';

interface GoogleRecaptchaProviderProps {
    recaptchaKey?: string;
}

export interface IGoogleRecaptchaContext {
    scriptUrl: string|null;
    getRecaptchaData: (formId: string) => Promise<string|undefined>;
    loadReCaptcha: () => void;
}

interface GoogleRecaptchaProviderValues {
    handleScriptLoadError: (error: Error) => void;
}

declare global {
    var recaptchaLoadCallback: () => void;
    var grecaptcha: {
        execute: (key: string|undefined, form : { action: string }) => Promise<string>
    }
}

export default (props: GoogleRecaptchaProviderProps): IGoogleRecaptchaContext & GoogleRecaptchaProviderValues => {
    const { recaptchaKey } = props;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [isErrored, setIsErrored] = useState<boolean>(false);
    const [scriptUrl, setScriptUrl] = useState<string|null>(null);
    const [queue, setQueue] = useState<(() => void)[]>([]);

    useEffect(() => {
        globalThis.recaptchaLoadCallback = () => {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isErrored && isLoaded && queue?.length) {
            queue.forEach((onLoad) => {
                onLoad();
            });
            setQueue([]);
        }
    }, [isLoaded, isErrored, queue]);

    const loadReCaptcha = useCallback(() => {
        setScriptUrl(`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}&onload=recaptchaLoadCallback`);
    }, []);

    const getRecaptchaData = useCallback(async (formId: string) => {
        return new Promise<string|undefined>(async (resolve) => {
            if (isErrored) {
                resolve(undefined);
            }

            const generateToken = async (): Promise<string|undefined> => {
                const token = await globalThis.grecaptcha?.execute(
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
                loadReCaptcha();

                return;
            }
    
            resolveToken();
        })
    }, [isLoaded, isErrored, loadReCaptcha]);

    const handleScriptLoadError = useCallback(() => {
        setIsErrored(true);
        setIsLoaded(true);
    }, [])

    return {
        scriptUrl,
        loadReCaptcha,
        getRecaptchaData,
        handleScriptLoadError
    };
};