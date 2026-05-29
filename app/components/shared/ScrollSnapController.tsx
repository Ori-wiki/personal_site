'use client';

import { useEffect, useRef } from 'react';

const sectionIds = ['top', 'about', 'skills', 'work', 'contact'];
const wheelLockMs = 1250;
const wheelThreshold = 1;
const goToSectionEventName = 'portfolio-go-to-section';
const heroScrollStartDelayMs = 40;
const sectionTransitionMs = 940;
const aboutIntroDelayMs = 620;
const skillsIntroDelayMs = 320;
const skillsExitResetDelayMs = sectionTransitionMs + 260;

function clampSectionIndex(index: number) {
  return Math.min(Math.max(index, 0), sectionIds.length - 1);
}

function getIndexByHash() {
  const hash = window.location.hash.replace('#', '');
  const hashIndex = sectionIds.indexOf(hash);

  return hashIndex === -1 ? 0 : hashIndex;
}

export function ScrollSnapController() {
  const targetIndexRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const wheelUnlockTimeoutRef = useRef<number | null>(null);
  const aboutIntroTimeoutRef = useRef<number | null>(null);
  const aboutIntroResetTimeoutRef = useRef<number | null>(null);
  const skillsIntroTimeoutRef = useRef<number | null>(null);
  const skillsExitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const pages = document.getElementById('portfolio-pages');

    if (!pages) {
      return;
    }

    const unlockWheel = () => {
      wheelLockedRef.current = false;
    };

    const lockWheel = () => {
      wheelLockedRef.current = true;

      if (wheelUnlockTimeoutRef.current) {
        window.clearTimeout(wheelUnlockTimeoutRef.current);
      }

      wheelUnlockTimeoutRef.current = window.setTimeout(
        unlockWheel,
        wheelLockMs,
      );
    };

    const goToSection = (
      index: number,
      updateHash = true,
      clearSectionPhase = true,
    ) => {
      const nextIndex = clampSectionIndex(index);
      const nextId = sectionIds[nextIndex];
      const previousIndex = targetIndexRef.current;
      const direction = nextIndex >= targetIndexRef.current ? 'down' : 'up';
      document.documentElement.dataset.previousSection = String(previousIndex);
      document.documentElement.dataset.sectionDirection = direction;

      if (clearSectionPhase) {
        delete document.documentElement.dataset.sectionPhase;
      }

      if (aboutIntroTimeoutRef.current) {
        window.clearTimeout(aboutIntroTimeoutRef.current);
        aboutIntroTimeoutRef.current = null;
      }

      if (aboutIntroResetTimeoutRef.current) {
        window.clearTimeout(aboutIntroResetTimeoutRef.current);
        aboutIntroResetTimeoutRef.current = null;
      }

      if (skillsIntroTimeoutRef.current) {
        window.clearTimeout(skillsIntroTimeoutRef.current);
        skillsIntroTimeoutRef.current = null;
      }

      if (skillsExitTimeoutRef.current) {
        window.clearTimeout(skillsExitTimeoutRef.current);
        skillsExitTimeoutRef.current = null;
      }

      delete document.documentElement.dataset.skillsLeaving;

      targetIndexRef.current = nextIndex;
      document.documentElement.style.setProperty(
        '--initial-section-offset',
        `-${nextIndex * 100}vh`,
      );
      pages.style.transform = `translate3d(0, -${nextIndex * 100}vh, 0)`;
      document.documentElement.dataset.activeSection = String(nextIndex);
      window.dispatchEvent(
        new CustomEvent('portfolio-section-change', { detail: nextIndex }),
      );

      if (nextIndex === 1) {
        aboutIntroTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.dataset.sectionPhase = 'about-intro';
          document.documentElement.dataset.aboutIntroShown = 'true';
        }, aboutIntroDelayMs);
      } else if (previousIndex === 1) {
        aboutIntroResetTimeoutRef.current = window.setTimeout(() => {
          delete document.documentElement.dataset.aboutIntroShown;
        }, sectionTransitionMs);
      }

      if (nextIndex === 2) {
        skillsIntroTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.dataset.sectionPhase = 'skills-intro';
        }, skillsIntroDelayMs);
      } else if (previousIndex === 2) {
        document.documentElement.dataset.skillsLeaving = 'true';
        skillsExitTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.dataset.skillsResetting = 'true';
          delete document.documentElement.dataset.skillsLeaving;
          window.requestAnimationFrame(() => {
            delete document.documentElement.dataset.skillsResetting;
          });
        }, skillsExitResetDelayMs);
      }

      if (updateHash) {
        window.history.replaceState(
          null,
          '',
          nextIndex === 0 ? window.location.pathname : `#${nextId}`,
        );
      }
    };

    const startSectionChange = (index: number, updateHash = true) => {
      const nextIndex = clampSectionIndex(index);
      const previousIndex = targetIndexRef.current;

      if (nextIndex === previousIndex) {
        return;
      }

      if (previousIndex === 0 && nextIndex > previousIndex) {
        document.documentElement.dataset.previousSection =
          String(previousIndex);
        document.documentElement.dataset.sectionDirection = 'down';
        document.documentElement.dataset.sectionPhase = 'hero-text-exit';
        window.setTimeout(
          () => goToSection(nextIndex, updateHash, false),
          heroScrollStartDelayMs,
        );
        window.setTimeout(() => {
          if (
            document.documentElement.dataset.sectionPhase === 'hero-text-exit'
          ) {
            delete document.documentElement.dataset.sectionPhase;
          }
        }, heroScrollStartDelayMs + sectionTransitionMs);
        return;
      }

      goToSection(nextIndex, updateHash);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      event.preventDefault();

      if (Math.abs(event.deltaY) < wheelThreshold) {
        return;
      }

      if (wheelLockedRef.current) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = clampSectionIndex(targetIndexRef.current + direction);

      if (nextIndex !== targetIndexRef.current) {
        lockWheel();
        startSectionChange(nextIndex);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a');
      const href = link?.getAttribute('href');

      if (!href?.startsWith('#')) {
        return;
      }

      const sectionIndex = sectionIds.indexOf(href.slice(1));

      if (sectionIndex === -1) {
        return;
      }

      event.preventDefault();
      startSectionChange(sectionIndex);
    };

    const handleHashChange = () => {
      startSectionChange(getIndexByHash(), false);
    };

    const handleGoToSection = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== 'number') {
        return;
      }

      startSectionChange(event.detail);
    };

    goToSection(getIndexByHash(), false);
    window.addEventListener('wheel', handleWheel, {
      capture: true,
      passive: false,
    });
    document.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener(goToSectionEventName, handleGoToSection);

    return () => {
      if (wheelUnlockTimeoutRef.current) {
        window.clearTimeout(wheelUnlockTimeoutRef.current);
      }

      if (aboutIntroTimeoutRef.current) {
        window.clearTimeout(aboutIntroTimeoutRef.current);
      }

      if (aboutIntroResetTimeoutRef.current) {
        window.clearTimeout(aboutIntroResetTimeoutRef.current);
      }

      if (skillsIntroTimeoutRef.current) {
        window.clearTimeout(skillsIntroTimeoutRef.current);
      }

      if (skillsExitTimeoutRef.current) {
        window.clearTimeout(skillsExitTimeoutRef.current);
      }

      window.removeEventListener('wheel', handleWheel, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener(goToSectionEventName, handleGoToSection);
    };
  }, []);

  return null;
}
