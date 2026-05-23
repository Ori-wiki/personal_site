const projects = [
  {
    title: "Analytics Dashboard",
    description: "A modern analytics dashboard with charts and reporting.",
    tags: ["Next.js", "TypeScript", "Charts"],
  },
  {
    title: "Task Management SaaS",
    description: "A full-featured task management app for teams.",
    tags: ["React", "Tailwind CSS", "API"],
  },
  {
    title: "Travel Landing Page",
    description: "A responsive landing page with a polished visual style.",
    tags: ["Next.js", "Motion", "Design"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold text-emerald-800">Projects</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">Some things I&apos;ve built</h2>
        </div>
        <a className="hidden text-sm font-medium text-emerald-800 hover:text-emerald-950 sm:block" href="#contact">
          View all projects
        </a>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article key={project.title} className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
            <div className={`h-44 ${index === 1 ? "bg-violet-100" : index === 2 ? "bg-sky-100" : "bg-emerald-100"}`} />
            <div className="p-5">
              <h3 className="font-semibold text-slate-950">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded bg-stone-100 px-3 py-1 text-xs text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
