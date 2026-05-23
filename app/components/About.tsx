const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "10+", label: "Completed projects" },
  { value: "5+", label: "Happy clients" },
  { value: "100%", label: "Job success" },
];

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-5 py-20">
      <div className="grid gap-12 rounded-lg border border-stone-200 bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr_0.8fr] lg:p-12">
        <div className="aspect-square w-full max-w-64 rounded-full bg-[linear-gradient(135deg,#e8eadf,#9fb29e)]" />
        <div>
          <p className="text-sm font-semibold text-emerald-800">About me</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-950">
            I&apos;m a frontend developer who loves clean code and beautiful interfaces.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600">
            I focus on performance, usability, and clear design. I enjoy turning ideas into
            products that solve real problems.
          </p>
        </div>
        <div className="grid gap-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-semibold text-slate-950">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
