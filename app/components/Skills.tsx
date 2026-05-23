import { CodeGlow } from "./CodeGlow";

const skills = [
  { label: "JavaScript", mark: "JS", boxed: true },
  { label: "React", mark: "R" },
  { label: "Vue", mark: "V" },
  { label: "Node", mark: "JS" },
  { label: "WordPress", mark: "W" },
  { label: "PHP", mark: "php" },
  { label: "SASS", mark: "Sass" },
  { label: "CSS3", mark: "3" },
  { label: "Bootstrap", mark: "B", boxed: true },
  { label: "HTML5", mark: "5" },
  { label: "Git", mark: "git" },
  { label: "Super-powers", mark: "O" },
  { label: "Visual Studio", mark: "VS" },
  { label: "Figma", mark: "F" },
];

export function Skills() {
  return (
    <section id="skills" className="portfolio-section">
      <CodeGlow position="top-right" />
      <CodeGlow position="bottom-left" />
      <a className="absolute bottom-[56px] left-[50px] z-20 text-3xl font-black text-white" href="https://github.com">
        gh
      </a>

      <div className="section-content relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col items-center justify-center px-8 pt-24 text-center lg:px-[130px]">
        <p className="text-base uppercase text-zinc-500">A problem is an opportunity to do your best.</p>
        <h2 className="mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl xl:text-[58px]">
          Skills &amp; Experience
        </h2>
        <p className="mt-8 max-w-3xl text-base font-bold leading-7 text-zinc-100">
          I specialize in crafting engaging and high-quality client-side web applications.
        </p>
        <p className="mt-5 max-w-[700px] text-base font-bold leading-7 text-zinc-100">
          My experience includes HTML, CSS, and JavaScript, building projects with React and Vue,
          developing custom features and plugins, creating animations, and coding interactive layouts.
          I also have full-stack experience, including working with WordPress, Node.js, and C#.
        </p>
        <p className="mt-5 text-base font-bold text-zinc-100">
          For a deeper look at my work and experience, visit my{" "}
          <span className="text-amber-400">Linkedin</span>
        </p>

        <div className="mt-16 grid w-full max-w-[900px] grid-cols-3 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
          {skills.map((skill) => (
            <div key={skill.label} className="flex flex-col items-center gap-3">
              <div
                className={`grid h-[68px] w-[68px] place-items-center text-[38px] font-black leading-none text-zinc-100 ${
                  skill.boxed ? "bg-zinc-100 text-[#121318]" : ""
                }`}
              >
                {skill.mark}
              </div>
              <p className="text-base font-semibold text-zinc-200">{skill.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
