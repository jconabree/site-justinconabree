"use client";

import { useCallback, useEffect, useMemo } from 'react';

import { useGsapContext } from '@/providers/GsapProvider';
import TestTransitionItem from '@/components/TestTransitionItem'
import { useWaitForReady } from '@/hooks/useWaitForReady'

import classes from './testTransitionGroup.module.css';

export default function TestTransitionGroup({ items, itemProps, id }) {
    const { ready } = useWaitForReady();
    const { getScrollTimeline } = useGsapContext();

    const timeline = useMemo(() => {
        if (!ready) {
            return;
        }

        return getScrollTimeline({
            scrollTrigger: {
                immediateRender: false,
                trigger: `#${id}`,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, [ready]);

    const addTransition = useCallback((callback) => {
        if (!timeline) {
            return null;
        }

        callback(timeline);
    }, [timeline]);

    useEffect(() => {
        return () => {
            timeline?.clear();
        }
    }, [])

    return (
        <div className={classes.root} id={id}>
            {items.map((content, index) => {
                const itemKey = `transition-item-${index}`;

                return (
                    <TestTransitionItem
                        addTransition={addTransition}
                        key={itemKey}
                        id={itemKey}
                        itemIndex={index}
                        groupReady={ready}
                        {...itemProps?.[index] ?? {}}
                    >
                        {content}
                    </TestTransitionItem>
                )
            })}
        </div>
    )
}