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
      if (initialized) {
        addSection(id, title, element.current);
      }
    }, [initialized]);

    useEffect(() => {
      if (addToNav) {
        setInitialized(true);
      }
    }, []);

  return (
    <div id={id} ref={element} {...sectionProps}>
        {children}
    </div>
  );
}