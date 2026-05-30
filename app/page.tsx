import { About } from "./components/sections/about/About";
import { Contact } from "./components/sections/contact/Contact";
import { Hero } from "./components/sections/hero/Hero";
import { Projects } from "./components/sections/projects/Projects";
import { Skills } from "./components/sections/skills/Skills";
import { GithubLink } from "./components/shared/GithubLink";
import { Header } from "./components/shared/Header";
import { ScrollRail } from "./components/shared/ScrollRail";
import { ScrollSnapController } from "./components/shared/ScrollSnapController";

export default function Home() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <ScrollSnapController />
      <ScrollRail />
      <GithubLink />
      <Header />
      <main
        id="portfolio-pages"
        className="fixed inset-0 min-h-svh w-full overflow-visible transition-[transform] duration-[var(--motion-duration-section)] ease-[var(--motion-ease-section)] will-change-transform [transform:translate3d(0,var(--initial-section-offset),0)]"
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
