const skills = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Git", "Figma"];

export function Skills() {
  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-5 py-12">
      <p className="text-sm font-semibold text-emerald-800">Skills</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950">Technologies I work with</h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <div key={skill} className="rounded-md border border-stone-200 bg-white px-5 py-4 shadow-sm">
            <p className="font-medium text-slate-900">{skill}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
