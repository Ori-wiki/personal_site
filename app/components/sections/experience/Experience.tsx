const jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    period: "2022 - Present",
    description: "Building scalable web applications with React, Next.js, and TypeScript.",
  },
  {
    title: "Junior Frontend Developer",
    company: "Web Studio",
    period: "2021 - 2022",
    description: "Developed responsive websites and collaborated with designers and backend developers.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-sm font-semibold text-emerald-800">Experience</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">Work experience</h2>
        <div className="mt-8 space-y-8 border-l border-stone-300 pl-6">
          {jobs.map((job) => (
            <article key={job.title} className="relative">
              <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-800" />
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-950">{job.title}</h3>
                  <p className="text-sm font-medium text-slate-700">{job.company}</p>
                </div>
                <p className="text-sm text-slate-500">{job.period}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{job.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="min-h-[320px] rounded-lg border border-stone-200 bg-[linear-gradient(135deg,#edf3ee,#a8bfae_60%,#6f907f)] shadow-sm" />
    </section>
  );
}
