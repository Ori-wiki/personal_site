const projects = [
  {
    title: "Analytics Redesign",
    description: "A sharper dashboard interface for reading product metrics faster.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Project Lato",
    description: "A management system focused on dense data and calm interactions.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Coastal Stories",
    description: "A visual landing page for places, routes, and outdoor experiences.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sportland Motion",
    description: "A high-energy product page with editorial imagery and motion cues.",
    image:
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#f3f3f3] px-5 py-20 text-[#535057] md:py-28"
    >
      <div className="pointer-events-none absolute inset-y-0 left-[23%] hidden w-px bg-zinc-300/50 md:block" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-zinc-300/50 md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[23%] hidden w-px bg-zinc-300/50 md:block" />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c7aaa4]">Case Studies</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Latest Works</h2>
      </div>

      <div className="relative mx-auto mt-14 flex max-w-4xl flex-col gap-24">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={`relative min-h-[310px] overflow-hidden shadow-[0_34px_70px_rgba(31,35,45,0.28)] ${
              index % 2 === 1 ? "md:-translate-x-10" : "md:translate-x-10"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(24, 27, 35, 0.58), rgba(24, 27, 35, 0.58)), url(${project.image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex min-h-[310px] items-center px-8 py-12 md:px-20">
              <div className={index % 2 === 1 ? "ml-auto text-right" : ""}>
                <h3 className="max-w-xl text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-2 max-w-md font-serif text-base font-semibold italic text-white">
                  {project.description}
                </p>
                <a
                  className="mt-6 inline-flex items-center gap-3 bg-[#ff4738] px-5 py-3 text-xs font-black tracking-wider text-white transition-transform hover:-translate-y-0.5"
                  href="#contact"
                >
                  Case Study
                  <span aria-hidden="true">-&gt;</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
