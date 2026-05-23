const navItems = [
  { label: "Case Studies", href: "#projects" },
  { label: "Experiments", href: "#experiments" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5">
        <a className="text-3xl font-black tracking-tighter text-white" href="#top">
          DK
        </a>
        <div className="hidden items-center gap-9 text-xs font-black text-zinc-300 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="transition-colors hover:text-white"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a className="text-xs font-black text-zinc-300 transition-colors hover:text-white" href="/resume.pdf">
          Resume
        </a>
      </nav>
    </header>
  );
}
