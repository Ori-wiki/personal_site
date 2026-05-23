type CodeGlowPosition = "bottom-left" | "bottom-right" | "top-left" | "top-right";

export function CodeGlow({ position = "bottom-left" }: { position?: CodeGlowPosition }) {
  const positionClass = {
    "bottom-left": "-left-8 bottom-0",
    "bottom-right": "-right-10 bottom-0",
    "top-left": "-left-8 top-0 rotate-180",
    "top-right": "-right-10 top-0 rotate-180",
  }[position];

  return (
    <div className={`pointer-events-none absolute ${positionClass} h-32 w-[330px] blur-[5px]`}>
      <div className="mb-3 h-3 w-72 rounded-full bg-sky-500/55 shadow-[0_0_22px_rgba(14,165,233,0.85)]" />
      <div className="mb-3 h-3 w-44 rounded-full bg-amber-400/55 shadow-[0_0_22px_rgba(251,191,36,0.85)]" />
      <div className="mb-3 h-3 w-60 rounded-full bg-sky-500/45 shadow-[0_0_22px_rgba(14,165,233,0.85)]" />
      <div className="mb-3 h-3 w-36 rounded-full bg-fuchsia-500/60 shadow-[0_0_22px_rgba(217,70,239,0.85)]" />
      <div className="ml-16 h-3 w-48 rounded-full bg-amber-400/55 shadow-[0_0_22px_rgba(251,191,36,0.85)]" />
    </div>
  );
}
