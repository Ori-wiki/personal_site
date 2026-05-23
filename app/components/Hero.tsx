export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#1b1d26] text-white">
      <div className="absolute left-[11%] top-[18%] h-3 w-3 rotate-45 border-2 border-[#e43d83]" />
      <div className="absolute right-[24%] top-[18%] h-4 w-4 rotate-45 border-2 border-[#e43d83]" />
      <div className="absolute bottom-[23%] left-[10%] h-5 w-5 rounded-full border-2 border-[#e43d83] border-l-transparent border-b-transparent" />
      <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-5 text-4xl font-black text-zinc-400 lg:flex">
        <a className="transition-colors hover:text-white" href="https://x.com" aria-label="Twitter">
          x
        </a>
        <a className="transition-colors hover:text-white" href="https://linkedin.com" aria-label="LinkedIn">
          in
        </a>
        <a className="transition-colors hover:text-white" href="https://github.com" aria-label="GitHub">
          gh
        </a>
      </div>
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-[20%] -translate-y-1/2 text-[360px] font-black leading-none tracking-[-0.12em] text-[#264d94]/75 md:block">
        DK
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 pt-20">
        <div id="about" className="max-w-2xl scroll-mt-24">
          <h1 className="text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
            Denis Kazakov
          </h1>
          <p className="mt-4 font-serif text-lg font-semibold italic text-zinc-300">
            Interactive Front-end Developer
          </p>
          <p className="mt-5 max-w-md text-sm font-semibold leading-7 text-zinc-400">
            I build expressive, responsive interfaces with React, Next.js, and TypeScript.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="inline-flex items-center gap-3 bg-[#ff4738] px-5 py-3 text-xs font-black tracking-wider text-white shadow-[8px_8px_0_rgba(255,255,255,0.18)] transition-transform hover:-translate-y-0.5"
              href="#about"
            >
              About Me
              <span aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </div>
      <a
        className="absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 text-xs font-black text-zinc-300 md:block"
        href="#projects"
      >
        Works
      </a>
      <div className="absolute bottom-0 left-1/2 h-14 w-px bg-zinc-500/70" />
    </section>
  );
}
