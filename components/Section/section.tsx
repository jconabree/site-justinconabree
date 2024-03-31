"use client";

import { useEffect, useRef, useState } from 'react';

import { useSectionContext } from '@/providers/SectionProvider';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    addToNav?: boolean;
    [key: string]: unknown;
}

export default function Section({ id, title, children, addToNav = true, ...sectionProps }: SectionProps) {
    const [initialized, setInitialized] = useState<boolean>();
    const { addSection } = useSectionContext();
    const element = useRef();

    useEffect(() => {
      if (initialized && addToNav) {
        addSection(id, title, element.current);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialized, id, title, addToNav]);

    useEffect(() => {
      setInitialized(true);
    }, []);

  return (
    <div id={id} ref={element} {...sectionProps}>
        {children}
    </div>
  );
}