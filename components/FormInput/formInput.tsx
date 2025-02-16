'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';

interface InputProps {
    type: 'text'|'email'|'number'|'password'|'textarea'|'hidden'|'checkbox'|'radio';
    name: string;
    setFormInputDirty: (fieldName: string, isChanged: boolean) => void;
    placeholder?: string;
    disabled?: boolean;
    onChange?: (event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
    [key: string]: unknown;
}

export default function FormInput(props: InputProps) {
    const { type, setFormInputDirty, onChange, disabled, placeholder, ...inputProps } = props;
    const { name } = inputProps;
    const { pending } = useFormStatus();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = useCallback((event: React.FormEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setFormInputDirty(name, true);

        if (typeof onChange === 'function') {
            onChange(event);
        }

        const textareaElement = textAreaRef.current || (inputProps.ref as React.RefObject<HTMLTextAreaElement>)?.current;
        
        if (textareaElement) {
            textareaElement.style.height = '16px';
            textareaElement.style.height = textareaElement.scrollHeight + 1 + 'px';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange, name, setFormInputDirty])

    useEffect(() => {
        if (pending) {
            setFormInputDirty(name, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pending]);

    switch(type) {
        case 'textarea':
            return (
                <textarea
                    disabled={pending||disabled}
                    onChange={handleChange}
                    placeholder={placeholder ? placeholder : ' '}
                    ref={textAreaRef}
                    {...inputProps}
                />
            );
        default:
            return (
                <input
                    type={type}
                    disabled={pending||disabled}
                    onChange={handleChange}
                    placeholder={placeholder ? placeholder : ' '}
                    {...inputProps}
                />
            );
    }
}