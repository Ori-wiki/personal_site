'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type TouchEvent,
} from 'react';
import {
  firstProjectCloneIndex,
  firstProjectIndex,
  projectSlides,
} from './data';

const motionTiming = {
  slideStartDelayMs: 40,
  slideTransitionDurationMs: 1200,
};
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const swipeThresholdPx = 48;

function subscribeToReducedMotionChange(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);

  mediaQuery.addEventListener('change', onStoreChange);

  return () => {
    mediaQuery.removeEventListener('change', onStoreChange);
  };
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  );
}

function shouldHandleMouseSwipe() {
  return window.innerWidth < 1024;
}

export function useProjectSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [exitingTextTrackIndex, setExitingTextTrackIndex] = useState<
    number | null
  >(null);
  const [resettingTextTrackIndex, setResettingTextTrackIndex] = useState<
    number | null
  >(null);
  const [isTrackSnapping, setIsTrackSnapping] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'previous' | 'next'>(
    'next',
  );
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotionChange,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const textExitTimeoutRef = useRef<number | null>(null);
  const slideCleanupTimeoutRef = useRef<number | null>(null);
  const textResetRafRef = useRef<number | null>(null);
  const swipeStartXRef = useRef<number | null>(null);
  const swipeStartYRef = useRef<number | null>(null);
  const swipeHandledRef = useRef(false);

  useEffect(() => {
    return () => {
      if (textExitTimeoutRef.current) {
        window.clearTimeout(textExitTimeoutRef.current);
      }

      if (slideCleanupTimeoutRef.current) {
        window.clearTimeout(slideCleanupTimeoutRef.current);
      }

      if (textResetRafRef.current) {
        window.cancelAnimationFrame(textResetRafRef.current);
      }
    };
  }, []);

  const changeSlide = useCallback(
    (index: number) => {
      if (index === activeIndex || exitingTextTrackIndex !== null) {
        return;
      }

      if (textExitTimeoutRef.current) {
        window.clearTimeout(textExitTimeoutRef.current);
      }

      if (slideCleanupTimeoutRef.current) {
        window.clearTimeout(slideCleanupTimeoutRef.current);
      }

      if (textResetRafRef.current) {
        window.cancelAnimationFrame(textResetRafRef.current);
      }

      const lastProjectIndex = projectSlides[projectSlides.length - 1].index;
      const isLastToFirstProject =
        activeIndex === lastProjectIndex && index === firstProjectIndex;
      const nextTrackIndex = isLastToFirstProject
        ? firstProjectCloneIndex
        : index;
      const previousTrackIndex = trackIndex;
      const activeMotionTiming = reduceMotion
        ? {
            slideStartDelayMs: 0,
            slideTransitionDurationMs: 0,
          }
        : motionTiming;

      setSlideDirection(nextTrackIndex > trackIndex ? 'next' : 'previous');
      setExitingTextTrackIndex(previousTrackIndex);

      textExitTimeoutRef.current = window.setTimeout(() => {
        setActiveIndex(index);
        setTrackIndex(nextTrackIndex);

        slideCleanupTimeoutRef.current = window.setTimeout(() => {
          setResettingTextTrackIndex(previousTrackIndex);
          setExitingTextTrackIndex(null);

          textResetRafRef.current = window.requestAnimationFrame(() => {
            textResetRafRef.current = window.requestAnimationFrame(() => {
              setResettingTextTrackIndex(null);
            });
          });

          if (isLastToFirstProject) {
            setIsTrackSnapping(true);
            setTrackIndex(firstProjectIndex);

            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => {
                setIsTrackSnapping(false);
              });
            });
          }
        }, activeMotionTiming.slideTransitionDurationMs);
      }, activeMotionTiming.slideStartDelayMs);
    },
    [activeIndex, exitingTextTrackIndex, reduceMotion, trackIndex],
  );

  const goToPrevious = useCallback(() => {
    const currentProjectIndex = projectSlides.findIndex(
      (slide) => slide.index === activeIndex,
    );

    if (currentProjectIndex <= 0) {
      changeSlide(projectSlides[projectSlides.length - 1].index);
      return;
    }

    changeSlide(projectSlides[currentProjectIndex - 1].index);
  }, [activeIndex, changeSlide]);

  const goToNext = useCallback(() => {
    const currentProjectIndex = projectSlides.findIndex(
      (slide) => slide.index === activeIndex,
    );

    if (
      currentProjectIndex === -1 ||
      currentProjectIndex === projectSlides.length - 1
    ) {
      changeSlide(projectSlides[0].index);
      return;
    }

    changeSlide(projectSlides[currentProjectIndex + 1].index);
  }, [activeIndex, changeSlide]);

  const isChangingSlide = exitingTextTrackIndex !== null;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') ||
        document.documentElement.dataset.activeSection !== '3'
      ) {
        return;
      }

      if (isEditableTarget(event.target) || isChangingSlide) {
        return;
      }

      event.preventDefault();

      if (event.key === 'ArrowRight') {
        goToNext();
        return;
      }

      goToPrevious();
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [goToNext, goToPrevious, isChangingSlide]);

  const resetSwipe = useCallback(() => {
    swipeStartXRef.current = null;
    swipeStartYRef.current = null;
    swipeHandledRef.current = false;
  }, []);

  const startSwipe = useCallback((clientX: number, clientY: number) => {
    swipeStartXRef.current = clientX;
    swipeStartYRef.current = clientY;
    swipeHandledRef.current = false;
  }, []);

  const finishSwipe = useCallback(
    (clientX: number, clientY: number) => {
      const startX = swipeStartXRef.current;
      const startY = swipeStartYRef.current;

      if (
        startX === null ||
        startY === null ||
        swipeHandledRef.current ||
        isChangingSlide
      ) {
        return;
      }

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX < swipeThresholdPx || absX < absY * 1.15) {
        return;
      }

      swipeHandledRef.current = true;

      if (deltaX < 0) {
        goToNext();
        return;
      }

      goToPrevious();
    },
    [goToNext, goToPrevious, isChangingSlide],
  );

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && !shouldHandleMouseSwipe()) {
        return;
      }

      startSwipe(event.clientX, event.clientY);
    },
    [startSwipe],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && !shouldHandleMouseSwipe()) {
        return;
      }

      finishSwipe(event.clientX, event.clientY);
      resetSwipe();
    },
    [finishSwipe, resetSwipe],
  );

  const handlePointerCancel = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'touch') {
        return;
      }

      resetSwipe();
    },
    [resetSwipe],
  );

  const handleTouchStart = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      if (event.touches.length !== 1) {
        resetSwipe();
        return;
      }

      const touch = event.touches[0];
      startSwipe(touch.clientX, touch.clientY);
    },
    [resetSwipe, startSwipe],
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.touches[0];
      const startX = swipeStartXRef.current;
      const startY = swipeStartYRef.current;

      if (!touch || startX === null || startY === null) {
        return;
      }

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX >= swipeThresholdPx && absX >= absY * 1.15) {
        if (event.cancelable) {
          event.preventDefault();
        }

        finishSwipe(touch.clientX, touch.clientY);
      }
    },
    [finishSwipe],
  );

  const handleTouchEnd = useCallback(
    (event: TouchEvent<HTMLDivElement>) => {
      const touch = event.changedTouches[0];

      if (touch) {
        finishSwipe(touch.clientX, touch.clientY);
      }

      resetSwipe();
    },
    [finishSwipe, resetSwipe],
  );

  return {
    activeIndex,
    changeSlide,
    goToNext,
    goToPrevious,
    isChangingSlide,
    isTrackSnapping,
    reduceMotion,
    resettingTextTrackIndex,
    slideDirection,
    trackIndex,
    exitingTextTrackIndex,
    swipeHandlers: {
      onPointerCancel: handlePointerCancel,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onTouchCancel: resetSwipe,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
      onTouchStart: handleTouchStart,
    },
  };
}
