const experiments = [
  {
    title: "CSS3 spin preloader",
    visual: "bg-[#1b1d26]",
    accent: "border-t-[#ff4738] border-r-[#2ce8c5]",
  },
  {
    title: "Search input animation",
    visual: "bg-[#22e7c9]",
    accent: "border-white",
  },
  {
    title: "Brick boilerplate",
    visual: "bg-white",
    accent: "border-[#ff4738]",
  },
  {
    title: "Open and close menu animation",
    visual: "bg-[#77f3b8]",
    accent: "border-white",
  },
];

export function Skills() {
  return (
    <section id="experiments" className="bg-[#f3f3f3] pt-10">
      <div className="px-5 pb-12 text-center">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c7aaa4]">
          Experiments &amp; Open Source
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#535057] sm:text-4xl">
          Web is fun.
        </h2>
      </div>

      <div className="grid border-y border-zinc-200 bg-white md:grid-cols-4">
        {experiments.map((experiment, index) => (
          <article
            key={experiment.title}
            className="flex min-h-[270px] flex-col justify-between border-zinc-200 px-8 py-8 md:border-r"
          >
            <div className="flex justify-center">
              <div
                className={`flex h-36 w-36 items-center justify-center rounded-full shadow-[0_24px_45px_rgba(31,35,45,0.18)] ${experiment.visual}`}
              >
                <div className={`h-14 w-14 rounded-full border-2 ${experiment.accent}`} />
              </div>
            </div>
            <div className="flex items-end justify-between gap-5 text-[#535057]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">Title</p>
                <h3 className="mt-1 text-xs font-semibold">{experiment.title}</h3>
              </div>
              <p className="text-xs font-black">{String(index + 1).padStart(2, "0")}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
