"use client";

import { useEffect, useState } from 'react';

import { useSectionContext } from '@/providers/SectionProvider';

const Registrar = ({id, title, parentRef }) => {
    const [init, setInit] = useState();
    const sectionContext = useSectionContext()
    const { addSection } = sectionContext;

    useEffect(() => {
      if (init) {
        addSection(id, title, parentRef.current);
      }
    }, [init]);

    useEffect(() => {
      if (addToNav) {
        setInit(true);
      }
    }, []);

    return null;
}

export default Registrar;