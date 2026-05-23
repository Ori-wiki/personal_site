export function Contact() {
  return (
    <footer id="contact" className="bg-[#1b1d26] px-5 py-24 text-center text-white">
      <div className="mx-auto max-w-4xl">
        <a className="inline-block text-5xl font-black tracking-tighter text-zinc-300" href="#top">
          DK
        </a>
        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm font-black">
          <a className="text-zinc-200 transition-colors hover:text-white" href="https://x.com">
            Twitter
          </a>
          <a className="text-zinc-200 transition-colors hover:text-white" href="https://linkedin.com">
            LinkedIn
          </a>
          <a className="text-zinc-200 transition-colors hover:text-white" href="https://github.com">
            Github
          </a>
          <a className="text-zinc-200 transition-colors hover:text-white" href="mailto:hello@example.com">
            Contact
          </a>
        </div>
        <p className="mt-8 text-xs font-semibold text-zinc-400">
          (c) 2026 Denis Kazakov - Frontend Developer
        </p>
      </div>
    </footer>
  );
}
