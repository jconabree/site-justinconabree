
import { useEffect, useState } from 'react';

import { useWaitForReady } from '@/hooks/useWaitForReady';
import classes from './testTransitionItem.module.css';

export default function TestTransitionItem(props) {
    const { itemIndex, id, addTransition, groupReady, children, ...itemProps } = props;

    const { ready } = useWaitForReady();

    useEffect(() => {
        if (ready && groupReady) {
            addTransition((timeline) => {
                timeline.to(`#${id}`, { duration: 1, x: -window.innerWidth/2 }, itemIndex * 0.25);
            })
        }
    }, [ready, groupReady]);
    
    return (
        <div className={classes.root} id={id} {...itemProps}>
            {children}
        </div>
    )
}