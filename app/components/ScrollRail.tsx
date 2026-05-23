"use client";

import { useEffect, useState } from "react";

const numbers = ["00", "01", "02", "03", "04"];
const sectionIds = ["top", "about", "skills", "work", "contact"];
const markerHeight = 50;
const railHeight = 250;
const markerTrackHeight = railHeight - markerHeight;
const markerStep = markerTrackHeight / (numbers.length - 1);
const goToSectionEventName = "portfolio-go-to-section";

export function ScrollRail() {
  const [active, setActive] = useState(0);
  const label = active === sectionIds.length - 1 ? "Back to Top" : "Scroll Down";

  const goToSection = (index: number) => {
    window.dispatchEvent(new CustomEvent(goToSectionEventName, { detail: index }));
  };

  useEffect(() => {
    const updateActiveSection = (event?: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === "number") {
        setActive(event.detail);
        return;
      }

      setActive(Number(document.documentElement.dataset.activeSection ?? 0));
    };

    updateActiveSection();
    window.addEventListener("portfolio-section-change", updateActiveSection);

    return () => {
      window.removeEventListener("portfolio-section-change", updateActiveSection);
    };
  }, []);

  return (
    <aside className="fixed right-[50px] top-1/2 z-40 hidden -translate-y-1/2 items-center gap-5 lg:flex">
      <div className="grid text-xs font-black text-zinc-200">
        {numbers.map((number, index) => (
          <button
            key={number}
            type="button"
            className={`grid h-[50px] w-8 cursor-pointer place-items-center text-left transition-colors hover:text-white ${
              index === active ? "text-white" : "text-zinc-300"
            }`}
            onClick={() => goToSection(index)}
            aria-label={`Go to section ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="relative h-[250px] w-px bg-zinc-600">
        <div
          className="absolute right-0 w-[3px] bg-white transition-[top] duration-500 ease-out"
          style={{
            top: `${active * markerStep}px`,
            height: `${markerHeight}px`,
          }}
        />
      </div>
      <div className="absolute -bottom-[128px] -right-2 flex translate-x-1/2 rotate-[-90deg] items-center gap-3 text-xs font-semibold tracking-widest text-zinc-500">
        <span>{label}</span>
        <span aria-hidden="true">{label === "Back to Top" ? "^" : "v"}</span>
      </div>
    </aside>
  );
}
