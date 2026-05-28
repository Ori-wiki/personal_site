"use client";

import { useEffect, useRef } from "react";

const sectionIds = ["top", "about", "skills", "work", "contact"];
const wheelLockMs = 520;
const wheelThreshold = 1;
const goToSectionEventName = "portfolio-go-to-section";

function clampSectionIndex(index: number) {
  return Math.min(Math.max(index, 0), sectionIds.length - 1);
}

function getIndexByHash() {
  const hash = window.location.hash.replace("#", "");
  const hashIndex = sectionIds.indexOf(hash);

  return hashIndex === -1 ? 0 : hashIndex;
}

export function ScrollSnapController() {
  const targetIndexRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const wheelUnlockTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const pages = document.getElementById("portfolio-pages");

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

      wheelUnlockTimeoutRef.current = window.setTimeout(unlockWheel, wheelLockMs);
    };

    const goToSection = (index: number, updateHash = true) => {
      const nextIndex = clampSectionIndex(index);
      const nextId = sectionIds[nextIndex];
      targetIndexRef.current = nextIndex;
      document.documentElement.style.setProperty("--initial-section-offset", `-${nextIndex * 100}vh`);
      pages.style.transform = `translate3d(0, -${nextIndex * 100}vh, 0)`;
      document.documentElement.dataset.activeSection = String(nextIndex);
      window.dispatchEvent(new CustomEvent("portfolio-section-change", { detail: nextIndex }));

      if (updateHash) {
        window.history.replaceState(null, "", nextIndex === 0 ? window.location.pathname : `#${nextId}`);
      }
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
        goToSection(nextIndex);
      }
    };

    const handleClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest("a");
      const href = link?.getAttribute("href");

      if (!href?.startsWith("#")) {
        return;
      }

      const sectionIndex = sectionIds.indexOf(href.slice(1));

      if (sectionIndex === -1) {
        return;
      }

      event.preventDefault();
      goToSection(sectionIndex);
    };

    const handleHashChange = () => {
      goToSection(getIndexByHash(), false);
    };

    const handleGoToSection = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== "number") {
        return;
      }

      goToSection(event.detail);
    };

    goToSection(getIndexByHash(), false);
    window.addEventListener("wheel", handleWheel, { capture: true, passive: false });
    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener(goToSectionEventName, handleGoToSection);

    return () => {
      if (wheelUnlockTimeoutRef.current) {
        window.clearTimeout(wheelUnlockTimeoutRef.current);
      }

      window.removeEventListener("wheel", handleWheel, { capture: true });
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(goToSectionEventName, handleGoToSection);
    };
  }, []);

  return null;
}
