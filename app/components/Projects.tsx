import { CodeGlow } from "./CodeGlow";

const projects = [
  {
    title: "Fit & Healthy",
    eyebrow: "Fitness & Wellness Coaching Platform",
    description:
      "Server rendered, progressive web application for online fitness and health coaching. Providing workout programs, nutrition plans, workout logs, follow up with client's progress and more.",
    builtWith: "NuxtJs, VueJs, JavaScript, Firebase, SASS.",
  },
];

export function Projects() {
  return (
    <section id="work" className="portfolio-section">
      <CodeGlow position="top-left" />
      <CodeGlow position="bottom-right" />
      <a className="absolute bottom-[56px] left-[50px] z-20 text-3xl font-black text-white" href="https://github.com">
        gh
      </a>

      <div className="absolute left-[20%] top-[4%] hidden h-[96%] w-[360px] bg-[radial-gradient(circle,#3f414a_1.7px,transparent_2px)] bg-[length:42px_42px] lg:block" />

      <div className="section-content relative z-10 mx-auto grid min-h-screen w-full max-w-[1500px] items-center gap-12 px-8 pt-28 lg:grid-cols-[1fr_0.9fr] lg:px-[130px]">
        <div className="relative hidden min-h-[560px] items-center justify-center lg:flex">
          <div className="relative h-[280px] w-[610px] -rotate-[16deg] rounded-[48px] border-[11px] border-zinc-500 bg-[#111318] shadow-[0_0_26px_rgba(255,255,255,0.55)]">
            <div className="absolute -inset-3 rounded-[58px] border border-zinc-700" />
            <div className="mx-auto mt-7 h-5 w-28 rounded-full bg-black" />
            <div className="mx-14 mt-7 rounded-lg bg-[#2f3135] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="h-7 w-36 rounded bg-[#8be36d]" />
                <div className="h-4 w-20 rounded bg-zinc-600" />
              </div>
              <div className="grid grid-cols-[1fr_0.8fr] gap-6">
                <div className="relative h-28 rounded bg-zinc-700">
                  <div className="absolute left-7 top-5 h-16 w-4 rounded-full bg-zinc-950" />
                  <div className="absolute right-10 top-5 h-16 w-4 rounded-full bg-zinc-950" />
                  <div className="absolute left-1/2 top-8 h-10 w-10 -translate-x-1/2 rounded-full border-2 border-zinc-500" />
                </div>
                <div className="space-y-3 pt-1">
                  <div className="h-3 rounded bg-zinc-500" />
                  <div className="h-3 rounded bg-zinc-500" />
                  <div className="h-3 w-2/3 rounded bg-zinc-500" />
                  <div className="mt-7 h-7 w-28 rounded bg-[#8be36d]" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-6">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span className="h-4 w-4 rounded-full bg-zinc-500" />
          </div>
        </div>

        {projects.map((project) => (
          <article key={project.title} className="-translate-y-1">
            <p className="text-base uppercase text-zinc-500">{project.eyebrow}</p>
            <h2 className="mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl xl:text-[58px]">
              {project.title}
            </h2>
            <p className="mt-10 max-w-[610px] text-base font-bold leading-7 text-zinc-100">
              {project.description}
            </p>
            <p className="mt-6 max-w-[610px] text-base font-black leading-7 text-zinc-100">
              Built with: <span className="font-semibold">{project.builtWith}</span>
            </p>
            <a className="mt-12 inline-flex items-center gap-4 text-lg font-black text-[#8be36d]" href="#contact">
              Visit the app
              <span aria-hidden="true">&gt;</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
