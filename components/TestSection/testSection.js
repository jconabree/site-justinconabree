"use client";

import { useEffect, useRef, useState } from 'react';

import { useSectionContext } from '@/providers/SectionProvider';

export default function Section({ id, title, children, addToNav = true, ...sectionProps }) {
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
    <div id={id} ref={element} {...sectionProps}>
        {children}
    </div>
  );
}
