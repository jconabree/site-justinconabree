"use client";

import { useEffect, useRef, useState } from 'react';

import { useSectionContext } from '@/providers/SectionProvider';
import RichContent from '@/components/RichContent';

import classes from './section.module.css';

export default function Section(props) {
    const { id, title, content, forceOnTop, addToNav = true } = props;
    const [init, setInit] = useState();
    const { addSection } = useSectionContext();
    const element = useRef();

    useEffect(() => {
      if (init) {
        addSection(id, title, element.current);
      }
    }, [init]);

    useEffect(() => {
      if (addToNav) {
        setInit(true);
      }
    }, []);

    return (
        <div
            className={forceOnTop ? classes.forceOnTop : classes.section}
            id={id}
            ref={element}
        >
            <RichContent content={content} />
        </div>
    );
}
