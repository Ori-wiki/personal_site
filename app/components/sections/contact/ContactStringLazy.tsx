'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { sectionChangeEventName, sectionIds } from '../../../navigation/data';

const contactSectionIndex = sectionIds.indexOf('contact');

const LazyContactString = dynamic(
  () => import('./ContactString').then((module) => module.ContactString),
  {
    ssr: false,
    loading: () => <ContactStringPlaceholder />,
  },
);

function ContactStringPlaceholder() {
  return (
    <div
      aria-hidden='true'
      className='relative hidden h-[470px] w-full max-w-[620px] lg:block'
    />
  );
}

export function ContactStringLazy() {
  const [isContactActive, setIsContactActive] = useState(false);

  useEffect(() => {
    const updateActiveSection = (event?: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'number') {
        setIsContactActive(event.detail === contactSectionIndex);
        return;
      }

      setIsContactActive(
        Number(document.documentElement.dataset.activeSection ?? 0) ===
          contactSectionIndex,
      );
    };

    updateActiveSection();
    window.addEventListener(sectionChangeEventName, updateActiveSection);

    return () => {
      window.removeEventListener(sectionChangeEventName, updateActiveSection);
    };
  }, []);

  return isContactActive ? <LazyContactString /> : <ContactStringPlaceholder />;
}
