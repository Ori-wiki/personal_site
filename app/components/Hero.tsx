export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-stone-200">
      <div className="mx-auto grid min-h-[640px] w-full max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <p className="mb-3 text-xl font-medium text-emerald-800">Hello, I&apos;m</p>
          <h1 className="text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
            Denis Kazakov
          </h1>
          <p className="mt-4 text-2xl font-semibold text-emerald-800">Frontend Developer</p>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-600">
            I build modern, responsive web applications with React, Next.js, and TypeScript.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="rounded-md bg-emerald-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-900"
              href="#projects"
            >
              View my work
            </a>
            <a
              className="rounded-md border border-stone-300 px-6 py-3 text-sm font-medium text-slate-900 transition-colors hover:border-emerald-800 hover:text-emerald-800"
              href="#contact"
            >
              Contact me
            </a>
          </div>
        </div>
        <div className="min-h-[360px] rounded-lg border border-stone-200 bg-[linear-gradient(135deg,#f8f5ec_0%,#dfe9df_45%,#88a996_100%)] shadow-sm" />
      </div>
    </section>
  );
}
