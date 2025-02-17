'use client';

import { useMemo, useActionState } from 'react';

interface FormProps {
    submitAction: (initialState: any, formData: FormData) => Promise<{ [key: string]: string; } | { [key: string]: string; }>,
    children: React.ReactNode;
    initialState: {
        [key: string]: string;
    }
    inputStates: {
        [key: string]: boolean;
    }
    [key: string]: unknown;
}

export default function Form(props: FormProps) {
    const { children, submitAction, initialState, inputStates, ...formProps } = props;

    const [state, formAction] = useActionState(submitAction, initialState);

    const isDirty = useMemo(() => {
        return Object.values(inputStates).includes(true);
    }, [inputStates]);

    if (state.message) {
        return (
            <div className="text-lg text-center">
                {state.message}
            </div>
        );
    }

    return (
        <form action={formAction} {...formProps}>
            {!isDirty && state?.error && (
                <p className="text-red-800">{state.error}</p>
            )}
            {children}
        </form>
    )
}