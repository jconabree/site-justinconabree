"use client";

import { useCallback, useEffect, useState } from 'react';

interface GoogleRecaptchaProviderProps {
    recaptchaKey?: string;
}

export interface IGoogleRecaptchaContext {
    scriptUrl: string|null;
    getRecaptchaData: (formId: string) => Promise<string>;
    loadReCaptcha: () => void;
}

declare global {
    var recaptchaLoadCallback: () => void;
    var grecaptcha: {
        execute: (key: string|undefined, form : { action: string }) => Promise<string>
    }
}

export default (props: GoogleRecaptchaProviderProps): IGoogleRecaptchaContext => {
    const { recaptchaKey } = props;

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [scriptUrl, setScriptUrl] = useState<string|null>(null);
    const [queue, setQueue] = useState<(() => void)[]>([]);

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

    const loadReCaptcha = useCallback(() => {
        setScriptUrl(`https://www.google.com/recaptcha/api.js?render=${recaptchaKey}&onload=recaptchaLoadCallback`);
    }, []);

    const getRecaptchaData = useCallback(async (formId: string) => {
        return new Promise<string>(async (resolve) => {
            const generateToken = async (): Promise<string> => {
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
                loadReCaptcha();
            }
    
            resolveToken();
        })
    }, [isLoaded, loadReCaptcha]);

    return {
        scriptUrl,
        loadReCaptcha,
        getRecaptchaData
    };
};