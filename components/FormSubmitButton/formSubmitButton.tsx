'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';

interface InputProps {
    children: React.ReactNode;
    disabled?: boolean;
    [key: string]: unknown;
}

export default function FormSubmitButton(props: InputProps) {
    const { disabled, children, ...rest } = props;
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending||disabled} {...rest}>
            {children}
        </Button>
    )
}