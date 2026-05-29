'use client';

import { useEffect, useState } from 'react';
import {
  goToSectionEventName,
  sectionChangeEventName,
  sectionIds,
  sectionLabels,
} from '../../navigation/data';

const numbers = ['00', '01', '02', '03', '04'];
const markerHeight = 50;
const railHeight = 250;
const markerTrackHeight = railHeight - markerHeight;
const markerStep = markerTrackHeight / (numbers.length - 1);

export function ScrollRail() {
  const [active, setActive] = useState(0);
  const label =
    active === sectionIds.length - 1 ? 'Back to Top' : 'Scroll Down';
  const nextSection = active === sectionIds.length - 1 ? 0 : active + 1;

  const goToSection = (index: number) => {
    window.dispatchEvent(
      new CustomEvent(goToSectionEventName, { detail: index }),
    );
  };

  useEffect(() => {
    const updateActiveSection = (event?: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === 'number') {
        setActive(event.detail);
        return;
      }

      setActive(Number(document.documentElement.dataset.activeSection ?? 0));
    };

    updateActiveSection();
    window.addEventListener(sectionChangeEventName, updateActiveSection);

    return () => {
      window.removeEventListener(sectionChangeEventName, updateActiveSection);
    };
  }, []);

  return (
    <>
      <aside className='fixed right-[50px] top-1/2 z-40 hidden -translate-y-1/2 items-center gap-5 lg:flex'>
        <div className='grid text-xs font-black text-zinc-200'>
          {numbers.map((number, index) => (
            <button
              key={number}
              type='button'
              className={`grid h-[50px] w-8 cursor-pointer place-items-center text-left transition-colors hover:text-white ${
                index === active ? 'text-white' : 'text-zinc-300'
              }`}
              onClick={() => goToSection(index)}
              aria-label={`Go to ${sectionLabels[index]} section`}
            >
              {number}
            </button>
          ))}
        </div>
        <div className='relative h-[250px] w-px bg-zinc-600'>
          <div
            className='absolute right-0 w-[3px] bg-white transition-[top] duration-500 ease-out'
            style={{
              top: `${active * markerStep}px`,
              height: `${markerHeight}px`,
            }}
          />
        </div>
      </aside>
      <button
        type='button'
        className='group fixed bottom-10 right-[46px] z-40 hidden cursor-pointer flex-col items-center gap-2 text-xs font-semibold tracking-widest text-zinc-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-zinc-200 lg:flex'
        onClick={() => goToSection(nextSection)}
        aria-label={label}
      >
        <span className='[writing-mode:vertical-rl]'>{label}</span>
        <span
          className={`h-2.5 w-2.5 border-b-2 border-r-2 border-current transition-transform duration-300 ${
            label === 'Back to Top'
              ? '-order-1 rotate-[225deg] group-hover:-translate-y-1'
              : 'rotate-45 group-hover:translate-y-1'
          }`}
          aria-hidden='true'
        />
      </button>
    </>
  );
}
