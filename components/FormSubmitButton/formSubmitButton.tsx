'use client';

import { useMemo, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';
import { useGoogleRecaptchaContext } from '@/providers/GoogleRecaptchaProvider';

interface InputProps {
    children: React.ReactNode;
    disabled?: boolean;
    recaptchaFormId?: string;
    [key: string]: unknown;
}

export default function FormSubmitButton(props: InputProps) {
    const { recaptchaFormId, disabled, children, ...rest } = props;
    const { pending } = useFormStatus();
    const { getRecaptchaData } = useGoogleRecaptchaContext();

    const [recaptchaLoading, setRecaptchaLoading] = useState<boolean>();
    const recaptchaRef = useRef<HTMLInputElement>(null)
    const submitButtonRef = useRef<HTMLButtonElement>(null)

    const submitProps = useMemo(() => {
        if (!recaptchaFormId) {
            return {
                type: 'submit'
            };
        }

        const handleSubmit = async () => {
            setRecaptchaLoading(true);
            const recaptchaToken = await getRecaptchaData(
                recaptchaFormId.replaceAll(/[^A-Za-z\/_]/g, '')
            );
            recaptchaRef.current!.value = recaptchaToken || '';
            setRecaptchaLoading(false);

            submitButtonRef.current!.click();
        };

        return {
            type: 'button',
            onPress: handleSubmit
        }
    }, [recaptchaFormId, getRecaptchaData]);

    return (
        <>
            {recaptchaFormId && (
                <>
                    <input ref={recaptchaRef} type="hidden" name="recaptchaToken" />
                    <button ref={submitButtonRef} type="submit" className="hidden" />
                </>
            )}
            <Button {...submitProps} disabled={pending||disabled||recaptchaLoading} {...rest}>
                {children}
            </Button>
        </>
    )
}