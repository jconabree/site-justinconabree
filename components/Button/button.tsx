"use client";

import { KeyboardEventHandler, MouseEventHandler, useCallback } from 'react';

import classes from './button.module.css';

interface ButtonProps {
    priority?: 'primary'|'secondary'|'tertiary'|'danger'|'unset';
    children: React.ReactNode;
    onPress?: (() => void)|MouseEventHandler<HTMLButtonElement>|KeyboardEventHandler<HTMLButtonElement>;
    onClick?: (() => void)|MouseEventHandler<HTMLButtonElement>|KeyboardEventHandler<HTMLButtonElement>;
    additionalClasses?: string;
    [key: string]: unknown;
}

const Button = (props: ButtonProps) => {
    const { priority = 'primary', additionalClasses, children, onPress, onClick, ...rest } = props;

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>|React.KeyboardEvent<HTMLButtonElement>) => {
        if (typeof onPress === 'function') {
            // @ts-ignore
            onPress(event);

            return;
        }

        if (typeof onClick === 'function') {
            // @ts-ignore
            onClick(event);

            return;
        }
    }, [onPress, onClick]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            handleClick(event);
        }
    }, [handleClick]);

    const classList = [
        classes[priority] ?? null,
        additionalClasses ?? null
    ].filter(Boolean).join(' ');

    return (
        <button
            className={classList}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...rest}
        >
            {priority !== 'unset' && (<span className={classes.content}>{children}</span>)}
            {priority === 'unset' && children}
        </button>
    )
};

export default Button;