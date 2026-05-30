'use client';

import { useEffect, useRef } from 'react';
import {
  activeSectionClasses,
  directionClasses,
  goToSectionEventName,
  phaseClasses,
  previousSectionClasses,
  sectionChangeEventName,
  sectionIds,
} from '../../navigation/data';

const wheelThreshold = 1;
const swipeAxisRatio = 1.15;
const swipeThreshold = 56;
const motionTiming = {
  aboutIntroDelayMs: 620,
  heroScrollStartDelayMs: 40,
  sectionTransitionMs: 940,
  skillsExitResetDelayMs: 1200,
  skillsIntroDelayMs: 0,
  wheelLockMs: 980,
};

function clampSectionIndex(index: number) {
  return Math.min(Math.max(index, 0), sectionIds.length - 1);
}

function getIndexByHash() {
  const hash = window.location.hash.replace('#', '');
  const hashIndex = sectionIds.indexOf(hash);

  return hashIndex === -1 ? 0 : hashIndex;
}

function setExclusiveClass(classNames: string[], className: string) {
  document.documentElement.classList.remove(...classNames);
  document.documentElement.classList.add(className);
}

function clearSectionPhaseClass() {
  document.documentElement.classList.remove(...phaseClasses);
}

function shouldHandleMouseSwipe() {
  return window.innerWidth < 1024;
}

function setSectionPhaseClass(phase: string) {
  clearSectionPhaseClass();
  document.documentElement.classList.add(`phase-${phase}`);
}

export function ScrollSnapController() {
  const targetIndexRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const wheelUnlockTimeoutRef = useRef<number | null>(null);
  const swipeStartXRef = useRef<number | null>(null);
  const swipeStartYRef = useRef<number | null>(null);
  const swipeHandledRef = useRef(false);
  const aboutIntroTimeoutRef = useRef<number | null>(null);
  const aboutIntroResetTimeoutRef = useRef<number | null>(null);
  const skillsIntroTimeoutRef = useRef<number | null>(null);
  const skillsResetFrameRef = useRef<number | null>(null);
  const skillsIntroFrameRef = useRef<number | null>(null);
  const skillsExitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const pages = document.getElementById('portfolio-pages');

    if (!pages) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const activeMotionTiming = prefersReducedMotion
      ? {
          aboutIntroDelayMs: 0,
          heroScrollStartDelayMs: 0,
          sectionTransitionMs: 0,
          skillsExitResetDelayMs: 0,
          skillsIntroDelayMs: 0,
          wheelLockMs: 120,
        }
      : motionTiming;

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
        activeMotionTiming.wheelLockMs,
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
      setExclusiveClass(
        previousSectionClasses,
        `previous-section-${previousIndex}`,
      );
      setExclusiveClass(directionClasses, `section-direction-${direction}`);

      if (clearSectionPhase) {
        clearSectionPhaseClass();
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

      if (skillsResetFrameRef.current) {
        window.cancelAnimationFrame(skillsResetFrameRef.current);
        skillsResetFrameRef.current = null;
      }

      if (skillsIntroFrameRef.current) {
        window.cancelAnimationFrame(skillsIntroFrameRef.current);
        skillsIntroFrameRef.current = null;
      }

      document.documentElement.classList.remove('skills-leaving');

      targetIndexRef.current = nextIndex;
      document.documentElement.style.setProperty(
        '--initial-section-offset',
        `-${nextIndex * 100}svh`,
      );
      pages.style.transform = `translate3d(0, -${nextIndex * 100}svh, 0)`;
      document.documentElement.dataset.activeSection = String(nextIndex);
      setExclusiveClass(activeSectionClasses, `active-section-${nextIndex}`);
      window.dispatchEvent(
        new CustomEvent(sectionChangeEventName, { detail: nextIndex }),
      );

      if (nextIndex === 1) {
        document.documentElement.classList.remove('about-intro-shown');
        aboutIntroTimeoutRef.current = window.setTimeout(() => {
          setSectionPhaseClass('about-intro');
          document.documentElement.classList.add('about-intro-shown');
        }, activeMotionTiming.aboutIntroDelayMs);
      } else if (previousIndex === 1) {
        aboutIntroResetTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.classList.remove('about-intro-shown');
        }, activeMotionTiming.sectionTransitionMs);
      }

      if (nextIndex === 2) {
        document.documentElement.classList.add('skills-resetting');
        skillsIntroTimeoutRef.current = window.setTimeout(() => {
          skillsResetFrameRef.current = window.requestAnimationFrame(() => {
            skillsIntroFrameRef.current = window.requestAnimationFrame(() => {
              document.documentElement.classList.remove('skills-resetting');
              setSectionPhaseClass('skills-intro');
            });
          });
        }, activeMotionTiming.skillsIntroDelayMs);
      } else if (previousIndex === 2) {
        document.documentElement.classList.add('skills-leaving');
        skillsExitTimeoutRef.current = window.setTimeout(() => {
          document.documentElement.classList.add('skills-resetting');
          document.documentElement.classList.remove('skills-leaving');
          window.requestAnimationFrame(() => {
            document.documentElement.classList.remove('skills-resetting');
          });
        }, activeMotionTiming.skillsExitResetDelayMs);
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
        setExclusiveClass(
          previousSectionClasses,
          `previous-section-${previousIndex}`,
        );
        setExclusiveClass(directionClasses, 'section-direction-down');
        setSectionPhaseClass('hero-text-exit');
        window.setTimeout(
          () => goToSection(nextIndex, updateHash, false),
          activeMotionTiming.heroScrollStartDelayMs,
        );
        window.setTimeout(() => {
          if (document.documentElement.classList.contains('phase-hero-text-exit')) {
            clearSectionPhaseClass();
          }
        }, activeMotionTiming.heroScrollStartDelayMs + activeMotionTiming.sectionTransitionMs);
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';

      if (isEditableTarget) {
        return;
      }

      event.preventDefault();

      if (wheelLockedRef.current) {
        return;
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = clampSectionIndex(targetIndexRef.current + direction);

      if (nextIndex !== targetIndexRef.current) {
        lockWheel();
        startSectionChange(nextIndex);
      }
    };

    const resetSwipe = () => {
      swipeStartXRef.current = null;
      swipeStartYRef.current = null;
      swipeHandledRef.current = false;
    };

    const startSwipe = (clientX: number, clientY: number) => {
      swipeStartXRef.current = clientX;
      swipeStartYRef.current = clientY;
      swipeHandledRef.current = false;
    };

    const finishSwipe = (clientX: number, clientY: number) => {
      const startX = swipeStartXRef.current;
      const startY = swipeStartYRef.current;

      if (
        startX === null ||
        startY === null ||
        swipeHandledRef.current ||
        wheelLockedRef.current
      ) {
        return;
      }

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absY < swipeThreshold || absY < absX * swipeAxisRatio) {
        return;
      }

      swipeHandledRef.current = true;
      const direction = deltaY < 0 ? 1 : -1;
      const nextIndex = clampSectionIndex(targetIndexRef.current + direction);

      if (nextIndex !== targetIndexRef.current) {
        lockWheel();
        startSectionChange(nextIndex);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.button !== 0 ||
        (event.pointerType === 'mouse' && !shouldHandleMouseSwipe())
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.isContentEditable ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';

      if (isEditableTarget) {
        return;
      }

      startSwipe(event.clientX, event.clientY);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && !shouldHandleMouseSwipe()) {
        return;
      }

      finishSwipe(event.clientX, event.clientY);
      resetSwipe();
    };

    const handlePointerCancel = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return;
      }

      resetSwipe();
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        resetSwipe();
        return;
      }

      const touch = event.touches[0];
      startSwipe(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];

      if (!touch) {
        resetSwipe();
        return;
      }

      finishSwipe(touch.clientX, touch.clientY);
      resetSwipe();
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        resetSwipe();
        return;
      }

      const startX = swipeStartXRef.current;
      const startY = swipeStartYRef.current;

      if (startX === null || startY === null) {
        return;
      }

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absY >= swipeThreshold && absY >= absX * swipeAxisRatio) {
        if (event.cancelable) {
          event.preventDefault();
        }

        finishSwipe(touch.clientX, touch.clientY);
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
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('pointerdown', handlePointerDown, {
      capture: true,
    });
    document.addEventListener('pointerup', handlePointerUp, { capture: true });
    document.addEventListener('pointercancel', handlePointerCancel, {
      capture: true,
    });
    document.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: true,
    });
    document.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: false,
    });
    document.addEventListener('touchend', handleTouchEnd, { capture: true });
    document.addEventListener('touchcancel', resetSwipe, { capture: true });
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

      if (skillsResetFrameRef.current) {
        window.cancelAnimationFrame(skillsResetFrameRef.current);
      }

      if (skillsIntroFrameRef.current) {
        window.cancelAnimationFrame(skillsIntroFrameRef.current);
      }

      if (skillsExitTimeoutRef.current) {
        window.clearTimeout(skillsExitTimeoutRef.current);
      }

      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('pointerdown', handlePointerDown, {
        capture: true,
      });
      document.removeEventListener('pointerup', handlePointerUp, {
        capture: true,
      });
      document.removeEventListener('pointercancel', handlePointerCancel, {
        capture: true,
      });
      document.removeEventListener('touchstart', handleTouchStart, {
        capture: true,
      });
      document.removeEventListener('touchmove', handleTouchMove, {
        capture: true,
      });
      document.removeEventListener('touchend', handleTouchEnd, {
        capture: true,
      });
      document.removeEventListener('touchcancel', resetSwipe, {
        capture: true,
      });
      document.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener(goToSectionEventName, handleGoToSection);
    };
  }, []);

  return null;
}
