'use client';

import React, { useCallback, useState } from 'react';

import classes from './hiddenText.module.css';

interface HiddenTextProps extends React.ComponentProps<'span'> {
}

export default function HiddenText(props: HiddenTextProps) {
    const { children } = props;

    const [isFiltered, setIsFiltered] = useState(true);

    const handleClick = useCallback(() => {
        setIsFiltered((current) => !current);
    }, [])

    return (
        <span
            onClick={handleClick}
            className={isFiltered ? classes.textBlurred : classes.text}
        >{children}</span>
    );
}