const numbers = ["00", "01", "02", "03", "04"];

export function ScrollRail({ active = 0, label = "Scroll Down" }: { active?: number; label?: string }) {
  return (
    <aside className="pointer-events-none absolute right-[50px] top-1/2 z-20 hidden -translate-y-1/2 items-center gap-5 lg:flex">
      <div className="grid gap-[26px] text-xs font-black text-zinc-200">
        {numbers.map((number, index) => (
          <span key={number} className={index === active ? "text-white" : "text-zinc-300"}>
            {number}
          </span>
        ))}
      </div>
      <div className="relative h-[250px] w-px bg-zinc-600">
        <div
          className="absolute right-0 w-[3px] bg-white"
          style={{ top: `calc(${active * 25}% - ${active === 4 ? 0 : 0}px)`, height: "50px" }}
        />
      </div>
      <div className="absolute -bottom-[128px] -right-2 flex translate-x-1/2 rotate-[-90deg] items-center gap-3 text-xs font-semibold tracking-widest text-zinc-500">
        <span>{label}</span>
        <span aria-hidden="true">{label === "Back to Top" ? "^" : "v"}</span>
      </div>
    </aside>
  );
}
