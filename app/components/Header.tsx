const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a className="text-lg font-semibold text-emerald-800" href="#top">
          DK
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <a key={item.href} className="transition-colors hover:text-emerald-800" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <a
          className="rounded-md bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          href="/resume.pdf"
        >
          Download CV
        </a>
      </nav>
    </header>
  );
}
