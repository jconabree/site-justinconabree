"use client";

import { useCallback } from 'react';

import classes from './button.module.css';

interface ButtonProps {
    priority?: 'primary'|'secondary'|'tertiary'|'danger';
    children: React.ReactNode;
    onPress?: () => void;
    onClick?: () => void;
    [key: string]: unknown;
}

const Button = (props: ButtonProps) => {
    const { priority = 'primary', children, onPress, onClick, ...rest } = props;

    const handleClick = useCallback(() => {
        if (typeof onPress === 'function') {
            onPress();

            return;
        }

        if (typeof onClick === 'function') {
            onClick();

            return;
        }
    }, [onPress, onClick]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    }, [handleClick]);

    return (
        <button
            className={classes[priority]}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            {...rest}
        >
            {children}
        </button>
    )
};

export default Button;