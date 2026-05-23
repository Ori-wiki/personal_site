import { CodeGlow } from "./CodeGlow";
import { ScrollRail } from "./ScrollRail";

export function Contact() {
  return (
    <footer id="contact" className="portfolio-section">
      <CodeGlow position="top-right" />
      <CodeGlow position="bottom-left" />
      <ScrollRail active={4} label="Back to Top" />
      <div className="absolute right-[16%] bottom-[13%] h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-zinc-100 to-sky-950 shadow-[0_26px_40px_rgba(0,0,0,0.45)]" />
      <a className="absolute bottom-[56px] left-[50px] z-20 text-3xl font-black text-white" href="https://github.com">
        gh
      </a>
      <a
        className="absolute right-10 bottom-16 hidden rotate-[-90deg] items-center gap-3 text-xs font-semibold tracking-widest text-zinc-400 lg:flex"
        href="#top"
      >
        Back to Top
        <span aria-hidden="true">^</span>
      </a>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] items-center justify-center px-8 pt-24 lg:px-28">
        <div className="max-w-[560px] text-left">
          <p className="text-lg font-black leading-8 text-zinc-100">
            What would you do if a software expert was just a click away?
          </p>
          <p className="mt-7 text-lg font-semibold leading-8 text-zinc-100">
            Whether you want to start a new project or just say hello, I&apos;d love to hear from
            you. You can also follow me on <span className="text-amber-400">Instagram</span>.
          </p>
          <a
            className="mt-10 block text-3xl font-black tracking-tight text-white transition-colors hover:text-[#b82ce0] sm:text-[34px]"
            href="mailto:tdrdimov@gmail.com"
          >
            tdrdimov@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
